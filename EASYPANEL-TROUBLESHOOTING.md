# 🚨 EASYPANEL TROUBLESHOOTING

## ❌ **PROBLEMAS COMUNS E SOLUÇÕES:**

### 1. **"npm error command failed"**
**Causa:** EasyPanel não consegue executar comandos NPM complexos
**Solução:** Use Docker ao invés de NPM

### 2. **"signal SIGTERM"**
**Causa:** Processo está sendo terminado pelo sistema
**Solução:** Use comando mais simples ou Docker

### 3. **"path /workspace error"**
**Causa:** Diretório de trabalho incorreto
**Solução:** Use caminhos absolutos ou Docker

## ✅ **SOLUÇÕES TESTADAS:**

### 🐳 **SOLUÇÃO 1 - DOCKER (MAIS ESTÁVEL):**
```yaml
# EasyPanel Config
Repository: https://github.com/UmMochileiro/Agrana.git
Dockerfile: Dockerfile.simple
Port: 80
Environment: production
```

### 📦 **SOLUÇÃO 2 - STATIC FILES:**
```yaml
# EasyPanel Config
Repository: https://github.com/UmMochileiro/Agrana.git
Build Command: echo "Files already built"
Start Command: serve -s www -p 4200
Port: 4200
```

### 🔧 **SOLUÇÃO 3 - PYTHON SERVER:**
```yaml
# EasyPanel Config
Repository: https://github.com/UmMochileiro/Agrana.git
Start Command: cd www && python3 -m http.server 4200
Port: 4200
```

## 🎯 **RECOMENDAÇÃO FINAL:**

**USE A SOLUÇÃO 1 (DOCKER)** - É a mais confiável para EasyPanel.

## 📝 **PASSOS PARA APLICAR:**

1. No EasyPanel, crie novo serviço
2. Repository: `https://github.com/UmMochileiro/Agrana.git`
3. **Build Type:** Docker
4. **Dockerfile:** `Dockerfile.simple`
5. **Port:** `80`
6. Domain: Configure para `/agrana/`

## 🔍 **SE AINDA NÃO FUNCIONAR:**

Verifique os logs do EasyPanel e me envie o erro específico.
