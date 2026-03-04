# App Concursos (Quiz de Legislação)

Um aplicativo web interativo e progressivo (PWA) construído com **React** e **Vite**, projetado para facilitar o aprendizado e a memorização de legislações e conteúdos para concursos púbicos.

## ✨ Características

* **Interface Dinâmica:** Feita em React para rápida interação.
* **Progressive Web App (PWA):** Instale o app localmente no seu dispositivo e acesse offline.
* **Múltiplos Tipos de Questão:** Suporte a questões padrão de múltipla escolha, associação de pares e outros formatos customizados.
* **Favoritos:** Salve perguntas importantes para revisar depois.
* **Dockerizado:** Fácil de rodar e fazer deploy utilizando Docker e Nginx.

## 🚀 Tecnologias Utilizadas

* [React](https://reactjs.org/) (v17)
* [Vite](https://vitejs.dev/)
* [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
* [Docker](https://www.docker.com/) & Nginx (para produção)

## 🛠️ Como executar o projeto localmente

### Pré-requisitos
* Node.js (v18+)
* NPM ou Yarn

### Passos de Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd app_concursos
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Para gerar a build de produção:
   ```bash
   npm run build
   ```

## 🐳 Executando com Docker

O projeto já conta com uma estrutura pronta para produção usando um webserver Nginx rodando em um container Docker.

1. Construa e suba a aplicação com Docker Compose:
   ```bash
   docker-compose up -d --build
   ```

2. A aplicação estará disponível na porta `8080`:
   ```text
   http://localhost:8080
   ```

## 📂 Estrutura do projeto

* `/src` - Código fonte React (componentes principais, tipos de questão, estilos).
* `/public` - Assets estáticos, ícones PWA e bancos de questões em formato JSON (ex: `disciplinas.json`).
* `Dockerfile` - Instruções de build da imagem otimizada.
* `nginx.conf` - Configurações do servidor proxy/web Nginx.
