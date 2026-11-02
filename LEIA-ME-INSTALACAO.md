# Controle de Gastos: instalar no Android e no computador

Este pacote é o seu app transformado em PWA (aplicativo instalável). Depois de instalado, ele tem ícone próprio na tela inicial, abre em tela cheia sem escolher navegador e funciona sem internet.

O PWA precisa ficar num endereço HTTPS uma única vez, só para o Android conseguir instalar. Depois de instalado, o uso do dia a dia não depende de internet.

## Passo 0: faça o backup ANTES de qualquer coisa

Seus dados ficam guardados no navegador, separados por endereço. O app instalado terá um endereço novo, então ele começa vazio e você vai restaurar o backup nele. Seus dados atuais não são apagados por nada neste processo, desde que você não limpe os dados do Chrome nem apague o arquivo antigo.

1. Abra o app que você usa hoje (o arquivo `controle-de-gastos-offline.html` ou o link do claude.ai).
2. Toque em **Backup** e depois em **Baixar backup (.json)**.
3. Guarde o arquivo `controle-gastos-AAAA-MM-DD.json` em mais de um lugar (Google Drive, e-mail para você mesmo, computador).
4. Se o download não funcionar, use **Copiar backup** e cole o texto num bloco de notas.

Mantenha o arquivo `.html` antigo até conferir que tudo foi restaurado no app novo.

## Passo 1: publicar (grátis, uns 5 minutos)

Opção recomendada: GitHub Pages. O repositório só guarda o código do app. Seus gastos nunca vão para lá.

1. Crie uma conta em github.com, se ainda não tiver.
2. Clique em **New repository**, dê o nome `controle-gastos`, deixe **Public** e crie.
3. Descompacte o zip. Em **Add file > Upload files**, arraste para a página estes itens que estão dentro da pasta `controle-gastos-pwa`: `index.html`, `manifest.webmanifest`, `sw.js` e a pasta `icons`. Arraste o conteúdo da pasta, não a pasta em si. Clique em **Commit changes**.
4. Vá em **Settings > Pages**. Em **Branch**, escolha `main` e `/ (root)`, e clique em **Save**.
5. Espere 1 a 2 minutos. O endereço será `https://SEU-USUARIO.github.io/controle-gastos/`.

Alternativas: Netlify Drop (app.netlify.com/drop, arraste a pasta) ou Cloudflare Pages. Qualquer hospedagem HTTPS serve.

Escolha o endereço com calma. Os dados ficam ligados a ele, e mudar de endereço depois exige novo backup e restauração.

## Passo 2: instalar no Android

1. No Chrome do celular, abra o endereço do passo 1.
2. Abra o menu do Chrome (três pontos) e toque em **Instalar app**. Em algumas versões aparece como **Adicionar à tela inicial** e depois **Instalar**. Na aba Backup do app também pode aparecer o botão **Instalar o app**.
3. Confirme. O ícone verde "Gastos" aparece na tela inicial e na gaveta de apps.
4. Toque no ícone. O app abre direto, sem barra de endereço e sem pedir navegador.

## Passo 3: restaurar seus dados no app novo

1. Abra o app pelo ícone e vá em **Backup**.
2. Em **Restaurar backup**, toque em **Escolher arquivo** e selecione o `.json` do passo 0.
3. O app mostra o resumo do que será restaurado. Confira e toque em **Substituir meus dados**.
4. Veja o mês atual e o histórico para conferir se está tudo ali.

## Passo 4: testar o modo offline

1. Abra o app pelo ícone com internet, pelo menos uma vez. Isso guarda o app no aparelho.
2. Ative o modo avião.
3. Feche o app e abra de novo pelo ícone. Ele deve abrir normalmente.
4. Registre um gasto, edite, feche e abra de novo. Os dados continuam lá.

## No computador

1. Abra o mesmo endereço no Chrome ou no Edge.
2. Clique no ícone de instalar, no fim da barra de endereço, ou em menu > **Instalar Controle de Gastos**.
3. Ele abre numa janela própria e aparece no menu Iniciar ou no Launchpad. Em tela larga, o layout usa duas colunas.
4. O computador tem seus próprios dados, separados do celular. Para levar dados de um aparelho para o outro, use Backup e Restaurar.

## Cuidados com os dados

- Os dados ficam no armazenamento do navegador, só neste aparelho. Não há sincronização entre celular e computador.
- Desinstalar o app ou limpar os dados do Chrome para o site apaga os dados. Faça backup de vez em quando, principalmente antes de mexer nessas opções.
- O app pede ao Android para proteger o armazenamento contra limpeza automática, mas isso não é garantido. O backup é a sua garantia.

## Atualizar o app no futuro

Quando você alterar o app, mude o número em `const VERSION = 'v1';` no arquivo `sw.js` (para `v2`, `v3` e assim por diante) e envie os arquivos de novo. Os aparelhos pegam a versão nova na próxima vez que abrirem o app com internet. Seus dados não são afetados.

## E o APK?

Para o que você pediu, o PWA basta: ícone, abertura direta, offline, dados salvos e backup. O APK só compensa se você precisar do app na Play Store ou de recursos nativos do Android.

Se quiser mesmo um APK, depois de publicar o PWA use o PWABuilder (pwabuilder.com): informe o endereço, escolha Android e baixe o pacote. Ele cria um app que abre o mesmo site. Os dados continuam guardados no Chrome, então o backup segue necessário.

Gerar um APK por conta própria exige Android Studio ou o Android SDK, que não existiam no ambiente onde este pacote foi criado. Por isso nenhum APK acompanha este pacote.

## Conteúdo do pacote

- `index.html`: o app (mesmo visual e funções de antes, mais o cartão "Instalar no aparelho")
- `manifest.webmanifest`: nome, cores e ícones do app
- `sw.js`: guarda o app no aparelho para abrir sem internet
- `icons/`: ícones 192, 512, 512 adaptável (maskable), Apple e favicon
