#  Mandaca App - React Native + Expo

Este é um aplicativo desenvolvido em **React Native utilizando Expo**.  
Siga os passos abaixo para configurar o ambiente e rodar o projeto localmente.

---

#  Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- **Node.js** (versão recomendada: LTS)
- **Git**
- **Expo Go** no celular

### Links para instalação

- Node.js: https://nodejs.org  
- Git: https://git-scm.com  
- Expo Go  
  - Android: https://play.google.com/store/apps/details?id=host.exp.exponent  
  - iOS: https://apps.apple.com/app/expo-go/id982107779  

---

#  Clonar o projeto

#### Clone o repositório:

git clone https://github.com/DanielSantana47/mandaca-app.git

#### Entre na pasta do projeto:

cd nome-do-projeto
Instalar as dependências

#### Execute o comando:

npm install

#### Para iniciar o projeto execute:

npx expo start

Isso abrirá o Expo Developer Tools no navegador.

#  Rodar no celular

Instale o Expo Go no seu celular

Certifique-se de que o celular e o computador estão na mesma rede Wi-Fi

Abra o Expo Go

Escaneie o QR Code que aparece no terminal ou no navegador

O aplicativo será aberto automaticamente no celular.

#  Rodar no emulador
Android Studio

Se você tiver o Android Studio instalado:

Abra um emulador Android

Execute no terminal:

npx expo start

Pressione A no terminal para abrir no Android.

#  Tecnologias utilizadas

React Native

Expo

TypeScript

Node.js

Nativewind

#  Problemas comuns
Erro de dependências

Tente apagar as dependências e instalar novamente:

rm -rf node_modules
npm install
Limpar cache do Expo
npx expo start -c"# mandaca-app" 