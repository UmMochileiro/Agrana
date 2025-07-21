# Dockerfile para EasyPanel
FROM node:18-alpine

# Instalar curl para health check
RUN apk add --no-cache curl

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

# Verificar se os arquivos foram criados
RUN ls -la www/ || echo "www directory not found"

# Instalar serve globalmente
RUN npm install -g serve

# Expor porta
EXPOSE 4200

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4200/ || exit 1

# Comando para iniciar (serve automaticamente escuta em 0.0.0.0)
CMD ["serve", "-s", "www", "-l", "4200", "--cors", "--single"]
