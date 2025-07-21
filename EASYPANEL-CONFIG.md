# EasyPanel Configuration - TROUBLESHOOTING

## 🚨 Service Not Reachable - Soluções:

### 🔧 Opção 1: Porta Configuração
```bash
# Start Command (tente diferentes portas):
npx serve -s www -l 80 --cors
# OU
npx serve -s www -l 3000 --cors
# OU
npx serve -s www -l 8080 --cors
```

### 🔧 Opção 2: Host Binding
```bash
# Start Command com host específico:
npx serve -s www -l 4200 --cors --host 0.0.0.0
```

### 🔧 Opção 3: Health Check
```bash
# Adicione health check script no package.json
"health": "curl http://localhost:4200 || echo 'Service down'"
```

## ⚡ Configuração Corrigida:

### Build Commands:
```bash
npm install
npm run build:deploy
```

### Start Command:
```bash
npx serve -s www -l 4200 --cors
```

## 🐳 Opção 2: Docker Build

Use o `Dockerfile` criado:
```bash
# EasyPanel irá usar automaticamente
docker build -t agrana .
docker run -p 4200:4200 agrana
```

## Build Commands (Execute em ordem):
```bash
# 1. Install dependencies with serve
npm install

# 2. Build application
npm run build:deploy

# 3. Verify build
ls -la www/
```

## Start Command:
```bash
npx serve -s www -l 4200 --cors
```

## Environment Variables:
```
NODE_ENV=production
NODE_VERSION=18
NPM_CONFIG_PRODUCTION=false
PORT=4200
```

## Port Configuration:
- Container Port: 4200
- Public Port: 80 ou 443

## Troubleshooting:

### Error: "could not determine executable to run"
**Solution**: Usar `npx serve` em vez de `ng serve` em produção

### Error: "ng: not found"
**Solution**: Scripts já usam `npx ng`

### Error: Build timeout
**Solution**: Usar build local e upload da pasta `www/`

## Files Structure After Build:
```
www/
├── index.html
├── .htaccess
├── main-*.js
└── assets/
```
