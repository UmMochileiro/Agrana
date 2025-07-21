# 🚨 EASYPANEL - SERVICE NOT REACHABLE - SOLUÇÕES

## 🎯 Tente estas configurações em ordem:

### **1. Start Command - Porta 4200:**
```bash
npx serve -s www -l 4200 --cors --host 0.0.0.0
```

### **2. Start Command - Porta 80:**
```bash
npx serve -s www -l 80 --cors --host 0.0.0.0
```

### **3. Start Command - Porta 3000:**
```bash
npx serve -s www -l 3000 --cors --host 0.0.0.0
```

### **4. Start Command - Porta 8080:**
```bash
npx serve -s www -l 8080 --cors --host 0.0.0.0
```

## 🔧 Environment Variables:
```
NODE_ENV=production
PORT=4200
HOST=0.0.0.0
NPM_CONFIG_PRODUCTION=false
```

## 🐳 Docker Alternative:
Se nada funcionar, use configuração Docker:
- **Build**: Automático (Dockerfile detectado)
- **Port**: 4200
- **Health Check**: Incluído

## ⚠️ Port Mapping no EasyPanel:
- **Container Port**: 4200 (ou a porta que funcionar)
- **Public Port**: 80 ou 443
- **Protocol**: HTTP

## 🔍 Debug Commands:
```bash
# Verificar se build existe
ls -la www/

# Verificar se serve está instalado
which serve

# Testar serve manualmente
serve --version
```

## 📝 Checklist:
- [ ] Build executado com sucesso (`npm run build:deploy`)
- [ ] Pasta `www/` existe e tem arquivos
- [ ] Serve instalado (`npm install serve`)
- [ ] Host configurado como `0.0.0.0`
- [ ] Port mapping correto no EasyPanel
- [ ] Health check funcionando

## 🎯 Se ainda não funcionar:
1. Tente usar **Dockerfile** (Docker build)
2. Verifique logs do container no EasyPanel
3. Teste com porta diferente (80, 3000, 8080)
4. Verifique se há firewall bloqueando
