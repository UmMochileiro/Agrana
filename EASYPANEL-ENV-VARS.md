# 🔧 ENVIRONMENT VARIABLES - EasyPanel

## Copie e cole estas variáveis na seção "Variáveis de Ambiente":

```
NODE_ENV=production
NODE_VERSION=18
NPM_CONFIG_PRODUCTION=false
PORT=4200
HOST=0.0.0.0
```

## 📋 Configuração Completa:

### **Build Commands:**
```bash
npm install
npm run build:deploy
```

### **Start Command:**
```bash
npx serve -s www -l 4200 --cors --host 0.0.0.0
```

### **Port Configuration:**
- **Container Port**: 4200
- **Public Port**: 80

## 🎯 Se ainda não funcionar, tente estas alternativas:

### **Start Command - Porta 80:**
```bash
npx serve -s www -l 80 --cors --host 0.0.0.0
```

### **Start Command - Porta 3000:**
```bash
npx serve -s www -l 3000 --cors --host 0.0.0.0
```

## ⚠️ Importante:
- Certifique-se que a pasta `www/` foi criada durante o build
- O `--host 0.0.0.0` é essencial para aceitar conexões externas
- Se usar porta diferente de 4200, ajuste também no Port Configuration
