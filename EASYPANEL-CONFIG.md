# EasyPanel Configuration

## ⚡ Opção 1: Simple Build (Recomendado)

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
