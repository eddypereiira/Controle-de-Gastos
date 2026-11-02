# Controle de Gastos (versão 2): instalar no Android e no computador

Esta versão corrige uma fragilidade do service worker e inclui uma página de diagnóstico, `diagnostico.html`, que mostra exatamente o que o Chrome do seu celular enxerga no site publicado. Seus gastos não são alterados por nada neste pacote.

## O que mudou em relação à versão 1

1. **Service worker mais resistente (`sw.js`, versão `v2`).** Na versão 1, se qualquer arquivo da lista não existisse no site publicado (um ícone esquecido no upload, por exemplo), o service worker inteiro deixava de instalar. Sem service worker, o app não abre offline e o Chrome pode não oferecer a instalação. Agora só o `index.html` é indispensável, e o resto é guardado se existir. Isso foi testado simulando um site com arquivos faltando.
2. **Outras páginas do site não são mais tratadas como o app.** O service worker só devolve o app para o endereço principal.
3. **`diagnostico.html`.** Verifica manifesto, ícones, service worker, HTTPS e o evento de instalação do Chrome, e gera um relatório para copiar.
4. **Manifesto.** Acrescentei `prefer_related_applications: false`. O resto é igual.
5. O app em si (visual, funções, backup) não mudou, salvo um link para o diagnóstico no cartão "Instalar no aparelho".

## Passo 0: backup antes de mexer em qualquer coisa

1. Abra o app que você usa agora, vá em **Backup** e toque em **Baixar backup (.json)**.
2. Guarde o arquivo em mais de um lugar (Google Drive, e-mail para você mesmo).
3. **Não limpe os dados do Chrome nem use "Limpar e redefinir" nas configurações do site.** Isso apaga os gastos guardados no navegador.

Substituir os arquivos no GitHub não apaga nada: os gastos ficam no navegador do seu celular, não no GitHub.

## Passo 1: substituir os arquivos no GitHub Pages

1. Descompacte este zip.
2. No seu repositório, clique em **Add file > Upload files**.
3. Arraste **o conteúdo** da pasta `controle-gastos-pwa` (não a pasta em si): `index.html`, `manifest.webmanifest`, `sw.js`, `diagnostico.html` e a pasta `icons`. Arquivos com o mesmo nome substituem os antigos.
4. Clique em **Commit changes**.
5. Abra a aba **Actions** do repositório e espere o item "pages build and deployment" ficar verde (1 a 2 minutos).

Os arquivos precisam ficar na **raiz** do repositório, ao lado do `index.html`, e a pasta `icons` precisa conter os 5 PNG diretamente (não pode ser `icons/icons/...`).

## Passo 2: conferir no navegador que os arquivos existem

Troque `USUARIO` e `REPO` pelos seus. Cada endereço deve mostrar o conteúdo, não "404":

- `https://USUARIO.github.io/REPO/manifest.webmanifest` mostra um texto JSON.
- `https://USUARIO.github.io/REPO/sw.js` mostra código.
- `https://USUARIO.github.io/REPO/icons/icon-512.png` mostra o ícone verde com a carteira.
- `https://USUARIO.github.io/REPO/icons/icon-192.png` idem, menor.

Se algum mostrar 404, o arquivo não está no lugar certo do repositório. Esse é o primeiro suspeito quando o Chrome só oferece "Criar atalho".

## Passo 3: rodar o diagnóstico no celular

1. No Chrome do Android, abra `https://USUARIO.github.io/REPO/diagnostico.html`.
2. Espere uns 10 segundos. A página lista cada verificação com ✓ (ok), ✗ (problema), ! (aviso) ou i (informação).
3. Toque em **Copiar relatório** e cole o texto numa mensagem para quem vai ajudar na análise.

O diagnóstico só lê arquivos do site e o estado do Chrome. Ele não abre nem altera os seus gastos.

## Passo 4: atualizar o celular e instalar

1. Abra o endereço do app com internet, espere alguns segundos, feche a aba e abra de novo. O service worker novo assume sozinho e os dados continuam lá.
2. Abra o menu do Chrome (três pontos). Deve aparecer **Instalar app**. Também pode aparecer o botão **Instalar o app** na aba Backup.
3. Confirme. O ícone verde "Gastos" aparece na tela inicial e o app abre em tela cheia, sem escolher navegador.
4. Se o app já foi instalado antes, o menu mostra **Abrir app** em vez de **Instalar app**.

## Se o diagnóstico estiver todo ✓ e ainda aparecer só "Criar atalho"

O Chrome do Android cria o app instalado (WebAPK) com ajuda de servidores do Google. Isso pode falhar por causas do aparelho, que o site não controla:

- Chrome desatualizado (atualize pela Play Store).
- Google Play Services desatualizado ou ausente.
- Aba anônima ou perfil de trabalho restrito.
- "Site para computador" ligado no menu do Chrome (desligue e abra de novo).
- Economia de dados ou navegador diferente do Chrome (use o Chrome ou o Samsung Internet).

Nesse caso, envie o relatório do diagnóstico para análise.

## No computador

Abra o endereço no Chrome ou no Edge e clique no ícone de instalar no fim da barra de endereço. O computador tem dados próprios, separados do celular. Para levar dados de um aparelho ao outro, use Backup e Restaurar.

## Restaurar dados, se precisar

No app, **Backup > Restaurar backup > Escolher arquivo**, selecione o `.json` e confirme **Substituir meus dados**. O app mostra o resumo antes de substituir.

## Atualizar o app no futuro

Quando alterar o app, mude `const VERSION = 'v2';` no arquivo `sw.js` para `v3`, `v4` e assim por diante, e envie os arquivos de novo.

## Conteúdo do pacote

- `index.html`: o app
- `manifest.webmanifest`: nome, cores e ícones do app
- `sw.js`: guarda o app no aparelho para abrir sem internet
- `diagnostico.html`: verificação de instalação
- `icons/`: ícones 192, 512, 512 adaptável (maskable), Apple e favicon
- `.nojekyll`: arquivo vazio, opcional (arquivos que começam com ponto às vezes não aparecem no upload; o app funciona sem ele)
