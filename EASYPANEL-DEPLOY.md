# 🚀 Deploy no EasyPanel - Agrana

## ⚡ Configuração Rápida

### **Opção 1: Build Local + Deploy**
```bash
# No seu computador local:
npm run build:deploy
```
Depois faça upload da pasta `www/` para o EasyPanel.

### **Opção 2: Build no EasyPanel**

#### **Environment Variables no EasyPanel:**
```
NODE_ENV=production
NODE_VERSION=18
NPM_CONFIG_PRODUCTION=false
```

#### **Build Commands:**
```bash
# Install
npm ci

# Build
npm run build:deploy
```

#### **Start Command:**
```bash
# Para servir arquivos estáticos
npx serve -s www -l 4200

# OU se usando nginx
nginx -g "daemon off;"
```

### **Opção 3: Docker (Recomendado)**

Use o arquivo `Dockerfile.easypanel`:

```bash
# Build da imagem
docker build -f Dockerfile.easypanel -t agrana .

# Run
docker run -p 80:80 agrana
```

## 🔧 Configurações Importantes

### **1. Port Binding**
- App roda na porta 4200 (desenvolvimento)
- Nginx roda na porta 80 (produção)

### **2. URL Configuration**
- Desenvolvimento: `http://localhost:4200/agrana`
- Produção: `https://seu-dominio.com/agrana`

### **3. Environment Variables**
Certifique-se de que no EasyPanel:
- `NODE_ENV=production`
- `FIREBASE_CONFIG` (se necessário)

## 🐛 Troubleshooting

### **Erro: `ng: not found`**
- ✅ **Solução**: Use `npx ng` em vez de apenas `ng`
- ✅ **Verificação**: Scripts já atualizados no `package.json`

### **Erro: Module not found**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### **Erro: Build timeout**
```bash
# Aumentar memory limit
node --max-old-space-size=4096 node_modules/.bin/ng build --prod
```

## 📁 Estrutura de Deploy

```
/app
├── www/              # Arquivos buildados
│   ├── index.html
│   ├── .htaccess
│   └── assets/
├── package.json      # Com scripts npx
└── nginx.conf        # Config nginx
```

## 🌐 URLs

- **Local**: `http://localhost:4200/agrana`
- **EasyPanel**: `https://seu-app.easypanel.host/agrana`
- **Produção**: `https://devcardoso.com/agrana`
