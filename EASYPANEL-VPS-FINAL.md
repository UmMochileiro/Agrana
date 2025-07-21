# 🚀 CONFIGURAÇÃO FINAL EASYPANEL - VPS

## ✅ CONFIGURAÇÃO ATUALIZADA QUE DEVE FUNCIONAR:

### **1. Environment Variables:**
```
NODE_ENV=production
NODE_VERSION=18
NPM_CONFIG_PRODUCTION=false
PORT=4200
```

### **2. Build Commands:**
```bash
npm install
npm run build:deploy
ls -la www/
```

### **3. Start Command:**
```bash
npx serve -s www -l 4200 --cors --single
```

### **4. Port Configuration:**
- **Container Port**: 4200
- **Public Port**: 80

## 🎯 MUDANÇAS IMPORTANTES:

1. ✅ **`.htaccess` criado** - Roteamento Angular corrigido
2. ✅ **`--single` adicionado** - SPA mode para Angular
3. ✅ **Build melhorado** - Copia .htaccess automaticamente
4. ✅ **Dockerfile atualizado** - Health check e verificações

## 🌐 URLS CORRETAS:

Depois do deploy, acesse:
- **EasyPanel**: `https://seu-app.easypanel.host/agrana/`
- **Domínio**: `https://devcardoso.com/agrana/`

⚠️ **IMPORTANTE**: Note o `/agrana/` no final da URL!

## 🔧 SE AINDA ESTIVER COM TELA PRETA:

1. Verifique os logs do container no EasyPanel
2. Acesse com `/agrana/` no final da URL
3. Verifique se o build criou a pasta `www/`
4. Teste diferentes Start Commands:

### **Start Command Alternativo 1:**
```bash
npx serve -s www -p 4200 --cors --single
```

### **Start Command Alternativo 2:**
```bash
serve -s www -l 4200 --cors --single
```

## 📋 CHECKLIST FINAL:
- [ ] Código atualizado no GitHub ✅
- [ ] Environment Variables configuradas
- [ ] Build Commands atualizados
- [ ] Start Command com `--single`
- [ ] Port mapping 4200 → 80
- [ ] Acesso com `/agrana/` na URL
