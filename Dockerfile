# Dockerfile para EasyPanel - Versão Simples
FROM nginx:alpine

# Copia arquivos de build para servir na raiz e subpasta /agrana/
COPY www /usr/share/nginx/html
COPY www /usr/share/nginx/html/agrana

# Configuração do Nginx
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
        add_header Cache-Control "no-cache"; \
    } \
    location /agrana/ { \
        try_files $uri $uri/ /agrana/index.html; \
        add_header Cache-Control "no-cache"; \
    } \
    add_header Access-Control-Allow-Origin "*" always; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

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
