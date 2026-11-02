/* Service worker do Controle de Gastos.
   Guarda o app no aparelho para abrir sem internet. Não toca nos seus dados:
   eles ficam no localStorage do navegador, que este arquivo não acessa.
   Ao publicar uma nova versão do app, mude o número em VERSION. */
const VERSION = 'v2';
const CACHE = 'controle-gastos-' + VERSION;

// Só o index.html é indispensável. Se um dos outros arquivos faltar no servidor,
// o service worker continua instalando (na v1, um arquivo faltando derrubava tudo).
const OPCIONAIS = [
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png',
  'diagnostico.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(async (c) => {
      await c.add(new Request('index.html', { cache: 'reload' }));
      await Promise.all(OPCIONAIS.map((u) => c.add(new Request(u, { cache: 'reload' })).catch(() => {})));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n.startsWith('controle-gastos-') && n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

const RAIZ = new URL('./', self.location).pathname;

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.search) return; // pedidos com ?parametro vão direto à rede (usado pelo diagnóstico)

  // Abrir o app (raiz ou index.html, em qualquer tipo de pedido): cache primeiro, atualiza em segundo plano.
  if (url.pathname === RAIZ || url.pathname === RAIZ + 'index.html') {
    event.respondWith(
      caches.match('index.html').then((guardado) => {
        const rede = fetch('index.html', { cache: 'no-cache' }).then((resp) => {
          if (resp && resp.ok) { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put('index.html', copia)); }
          return resp;
        }).catch(() => null);
        return guardado || rede.then((r) => r || new Response('Sem conexão.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }));
      })
    );
    return;
  }

  // Demais arquivos do app (inclui outras páginas): cache primeiro, com atualização em segundo plano.
  event.respondWith(
    caches.match(req).then((guardado) => {
      const rede = fetch(req.mode === 'navigate' ? req : new Request(req, { cache: 'no-cache' })).then((resp) => {
        if (resp && resp.ok && resp.type === 'basic') { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
        return resp;
      }).catch(() => guardado);
      return guardado || rede;
    })
  );
});
