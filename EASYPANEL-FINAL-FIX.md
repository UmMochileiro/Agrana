# 🔧 EASYPANEL - CONFIGURAÇÃO CORRIGIDA

## ❌ Problema: `ARG UNKNOWN_OPTION --host`

O comando `serve` não aceita `--host`. Por padrão ele já escuta em `0.0.0.0`.

## ✅ CONFIGURAÇÃO CORRETA:

### **Environment Variables:**
```
NODE_ENV=production
NODE_VERSION=18
NPM_CONFIG_PRODUCTION=false
PORT=4200
```
**REMOVA**: `HOST=0.0.0.0` (não é necessário)

### **Build Commands:**
```bash
npm install
npm run build:deploy
```

### **Start Command (CORRETO):**
```bash
npx serve -s www -l 4200 --cors
```

### **Port Configuration:**
- **Container Port**: 4200
- **Public Port**: 80

## 🔄 Alternativas se não funcionar:

### **Start Command - Porta 3000:**
```bash
npx serve -s www -l 3000 --cors
```
**Port**: Container 3000, Public 80

### **Start Command - Porta 8080:**
```bash
npx serve -s www -l 8080 --cors
```
**Port**: Container 8080, Public 80

## 🎯 IMPORTANTE:
- **REMOVA** `--host 0.0.0.0` de todos os comandos
- O `serve` já escuta em todas as interfaces por padrão
- Tente porta 4200 primeiro, depois 3000, depois 8080
