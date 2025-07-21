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
