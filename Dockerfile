# Dockerfile para EasyPanel
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build:deploy

# Instalar serve globalmente
RUN npm install -g serve

# Expor porta
EXPOSE 4200

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4200/ || exit 1

# Comando para iniciar
CMD ["serve", "-s", "www", "-l", "4200", "--cors", "--host", "0.0.0.0"]
