# ==========================================
# Stage 1: Build (Ambiente de Construção)
# ==========================================
FROM node:20-alpine AS builder

# Diretório de trabalho conteinerizado
WORKDIR /app

# Copiar os arquivos de dependência primeiro (Aproveitando cache lógico do Docker)
COPY package.json package-lock.json ./
RUN npm ci

# Copiar todo o código fonte e rodar a compilação local protegida
COPY . .
RUN npm run build

# ==========================================
# Stage 2: Production (Ambiente Final Servido)
# ==========================================
FROM nginx:alpine AS production

# Remover a página HTML de boas vindas padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar configuração estrita arquitetural tratada
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Extrair os artefatos visualmente limpos gerados no Stage 1 isolado
COPY --from=builder /app/dist /usr/share/nginx/html

# A otimização via Expose expõe nativamente a porta 80 para mapeamento do Compose
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
