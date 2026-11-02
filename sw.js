/* Service worker do Controle de Gastos.
   Guarda o app no aparelho para abrir sem internet. Não toca nos seus dados:
   eles ficam no localStorage do navegador, que este arquivo não acessa.
   Ao publicar uma nova versão do app, mude o número em VERSION. */
const VERSION = 'v1';
const CACHE = 'controle-gastos-' + VERSION;
const ARQUIVOS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n.startsWith('controle-gastos-') && n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Abrir o app (navegação): cache primeiro, atualiza em segundo plano.
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('index.html').then((guardado) => {
        const rede = fetch(req).then((resp) => {
          if (resp && resp.ok) { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put('index.html', copia)); }
          return resp;
        }).catch(() => null);
        return guardado || rede.then((r) => r || new Response('Sem conexão.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }));
      })
    );
    return;
  }

  // Demais arquivos do app: cache primeiro, com atualização em segundo plano.
  event.respondWith(
    caches.match(req).then((guardado) => {
      const rede = fetch(req).then((resp) => {
        if (resp && resp.ok) { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
        return resp;
      }).catch(() => guardado);
      return guardado || rede;
    })
  );
});
