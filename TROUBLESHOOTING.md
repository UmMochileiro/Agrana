# 🔧 TROUBLESHOOTING - Aplicação não funcional

## 🚨 Possíveis Problemas:

### 1. **Roteamento Angular não funciona**
**Sintoma**: Página carrega mas navegação interna falha
**Solução**: Arquivo `.htaccess` configurado ✅

### 2. **Base href incorreto**
**Sintoma**: Assets não carregam (CSS, JS)
**Solução**: `--base-href=/agrana/` configurado ✅

### 3. **CORS Issues**
**Sintoma**: Erro no console do browser
**Solução**: `--cors` adicionado ao serve ✅

### 4. **SPA Routing**
**Sintoma**: Refresh da página dá 404
**Solução**: `--single` adicionado para SPA mode ✅

## 🔧 CONFIGURAÇÃO ATUALIZADA:

### **Start Command (Nova versão):**
```bash
npx serve -s www -l 4200 --cors --single
```

### **Build Commands:**
```bash
npm install
npm run build:deploy
ls -la www/
```

## 🧪 TESTES:

### 1. Verificar se build foi executado:
```bash
ls -la www/
```
Deve mostrar: `index.html`, `main-*.js`, `styles-*.css`

### 2. Verificar se .htaccess foi copiado:
```bash
ls -la www/.htaccess
```

### 3. Testar roteamento:
- URL: `/agrana/` - deve carregar a app
- URL: `/agrana/dashboard` - deve funcionar (não dar 404)

## 📋 CHECKLIST DE DEBUGGING:

- [ ] Build criou pasta `www/`
- [ ] Arquivo `index.html` existe em `www/`
- [ ] Assets (JS, CSS) estão em `www/`
- [ ] `.htaccess` copiado para `www/`
- [ ] Base href aponta para `/agrana/`
- [ ] Serve está com `--single` para SPA
- [ ] Port mapping correto (4200 → 80)

## 🎯 Se ainda não funcionar:

### **Teste local primeiro:**
```bash
npm run build:deploy
npx serve -s www -l 4200 --cors --single
```
Acesse: `http://localhost:4200`

### **Debug no EasyPanel:**
1. Verifique logs do container
2. Teste diferentes URLs
3. Verifique console do browser (F12)
