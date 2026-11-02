# Controle de Gastos (versão 3): instalar no Android e no computador

## O que mudou

Na versão 2, os ícones ficavam dentro de uma pasta `icons/`. No seu site publicado, os arquivos soltos (`manifest.webmanifest`, `sw.js`) chegaram, mas os três ícones deram 404. Isso é o padrão de uma pasta que não foi enviada ao GitHub, e sem os ícones o Chrome não oferece a instalação, só "Criar atalho".

Na versão 3 **não existe nenhuma subpasta**. Todos os arquivos ficam na raiz, ao lado do `index.html`, e podem ser enviados juntos com o botão "choose your files" do GitHub.

- Ícones: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (mais `apple-touch-icon.png` e `favicon-32.png`).
- `manifest.webmanifest` aponta para eles sem pasta (por exemplo `"src": "icon-192.png"`).
- `sw.js` passou para a versão `v3`.
- O app, as funções e o formato dos dados não mudaram.

## Passo 0: backup antes de mexer em qualquer coisa

1. No app, abra **Backup** e toque em **Baixar backup (.json)**. Guarde o arquivo em mais de um lugar.
2. Não limpe os dados do Chrome nem use "Limpar e redefinir" nas configurações do site, porque isso apaga os gastos.

Substituir arquivos no GitHub não apaga nada: seus gastos ficam no navegador do celular, não no GitHub.

## Passo 1: enviar os arquivos para o GitHub

Endereço do repositório: `https://github.com/eddypereiira/Controle-de-Gastos` (confira o nome exato no seu GitHub).

1. Descompacte o ZIP.
2. No repositório, clique em **Add file > Upload files**.
3. Envie **os 9 arquivos do app (sem o LEIA-ME)** da pasta de uma vez: `index.html`, `manifest.webmanifest`, `sw.js`, `diagnostico.html`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` e `favicon-32.png`. Use "choose your files" e selecione todos juntos, ou arraste os arquivos. Não envie a pasta em si.
4. O `.nojekyll` é opcional (arquivos que começam com ponto às vezes não aparecem na seleção). O app funciona sem ele.
5. Clique em **Commit changes**.
6. Na aba **Actions**, espere "pages build and deployment" ficar verde (1 a 2 minutos).

Se existir uma pasta `icons` antiga no repositório, ela pode ficar. A versão 3 não usa essa pasta.

## Passo 2: conferir que os arquivos existem

Cada endereço deve mostrar conteúdo, não "404":

- `https://eddypereiira.github.io/Controle-de-Gastos/manifest.webmanifest`
- `https://eddypereiira.github.io/Controle-de-Gastos/sw.js`
- `https://eddypereiira.github.io/Controle-de-Gastos/icon-192.png`
- `https://eddypereiira.github.io/Controle-de-Gastos/icon-512.png`
- `https://eddypereiira.github.io/Controle-de-Gastos/icon-maskable-512.png`

Atenção às letras maiúsculas: `Controle-de-Gastos` é diferente de `controle-de-gastos`.

Observação: o GitHub Pages guarda cada arquivo em cache por cerca de 10 minutos. Se o manifesto antigo ainda aparecer, espere um pouco e atualize.

## Passo 3: diagnóstico no celular

Abra `https://eddypereiira.github.io/Controle-de-Gastos/diagnostico.html` no Chrome do Android e espere uns 10 segundos. O esperado é nenhum item ✗. Se sobrar algum, toque em **Copiar relatório** e envie para análise. O diagnóstico só lê arquivos do site e não toca nos seus gastos.

## Passo 4: atualizar e instalar

1. Abra o app com internet, espere alguns segundos, feche a aba e abra de novo. O service worker novo assume sozinho e os dados continuam lá.
2. No menu do Chrome (três pontos), toque em **Instalar app**.
3. Confirme. O ícone verde "Gastos" aparece na tela inicial e o app abre em tela cheia, sem escolher navegador.
4. Se o app já foi instalado, o menu mostra **Abrir app** em vez de **Instalar app**.

## Se o diagnóstico estiver todo ✓ e ainda aparecer só "Criar atalho"

O Chrome do Android cria o app instalado com ajuda de servidores do Google, e isso pode falhar por causas do aparelho:

- Chrome desatualizado (atualize pela Play Store).
- Google Play Services desatualizado ou ausente.
- Aba anônima ou perfil de trabalho restrito.
- "Site para computador" ligado no menu do Chrome.
- Navegador diferente do Chrome ou do Samsung Internet.

## No computador

Abra o endereço no Chrome ou no Edge e clique no ícone de instalar no fim da barra de endereço. O computador tem dados próprios, separados do celular. Para levar dados de um aparelho ao outro, use Backup e Restaurar.

## Restaurar dados, se precisar

No app: **Backup > Restaurar backup > Escolher arquivo**, selecione o `.json` e confirme **Substituir meus dados**. O app mostra o resumo antes de substituir.

## Atualizar o app no futuro

Mude `const VERSION = 'v3';` no `sw.js` para `v4`, `v5` e assim por diante, e envie os arquivos de novo.

## Conteúdo do pacote (tudo na raiz)

- `index.html`: o app
- `manifest.webmanifest`: nome, cores e ícones
- `sw.js`: uso offline
- `diagnostico.html`: verificação de instalação
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`: ícones
- `.nojekyll`: arquivo vazio, opcional
