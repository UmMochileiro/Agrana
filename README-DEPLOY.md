# Agrana - Sistema de Gestão Financeira

## ✅ Status: Pronto para Deploy

A aplicação Agrana está completamente configurada e pronta para ser hospedada em `devcardoso.com/agrana`.

## 📁 Arquivos Importantes

### Build de Produção
- 📦 **agrana-build-devcardoso.zip** - Build completo pronto para upload
- 📂 **www/** - Pasta com os arquivos compilados

### Configurações de Deploy
- ⚙️ **.htaccess** - Configurado para subdirectório `/agrana/`
- 🔗 **Base URL** - Configurado para `devcardoso.com/agrana`
- 📱 **Angular 20 + Ionic 8** - Build otimizado

## 🚀 Instruções de Deploy

### 1. Upload dos Arquivos
1. Extrair o arquivo `agrana-build-devcardoso.zip`
2. Fazer upload do conteúdo para a pasta `agrana/` no servidor
3. Certificar-se de que o arquivo `.htaccess` foi copiado

### 2. Estrutura no Servidor
```
devcardoso.com/
├── agrana/
│   ├── index.html
│   ├── .htaccess
│   ├── assets/
│   ├── chunk-*.js
│   ├── main-*.js
│   └── ... (outros arquivos)
```

### 3. Acesso
- 🌐 **URL:** `https://devcardoso.com/agrana`
- 📱 **Mobile First** - Totalmente responsivo

## 🔧 Configurações Técnicas

### Build Settings
- **Base href:** `/agrana/`
- **Production:** Sim
- **Optimization:** Habilitada
- **Bundle size:** ~1.69 MB inicial

### Recursos Configurados
- ✅ Roteamento Angular (SPA)
- ✅ Cache de assets (1 mês)
- ✅ Headers de segurança
- ✅ Redirecionamento para index.html
- ✅ Compatibilidade com subdirectório

### Páginas Disponíveis
- 🏠 Dashboard principal
- 💰 Transações
- 📊 Relatórios
- 🎯 Metas
- ⚙️ Configurações
- 🔐 Login/Registro

## 📱 Funcionalidades

### Sistema de Autenticação
- Firebase Authentication integrado
- Login com email/senha
- Registro de usuários
- Recuperação de senha

### Gestão Financeira
- Dashboard com resumo financeiro
- Sistema de transações locais
- Categorização de gastos
- Metas de economia
- Relatórios visuais

### Interface Moderna
- Design Material + Ionic
- Dark/Light mode
- Animações suaves
- Totalmente responsivo

## 🗂️ Estrutura da Aplicação

### Páginas Principais
- `dashboard` - Visão geral financeira
- `transacoes` - Gestão de transações
- `metas` - Metas financeiras
- `relatorio` - Relatórios e gráficos
- `configuracoes-*` - Configurações

### Serviços
- `AuthService` - Autenticação Firebase
- `DatabaseService` - Gestão de dados
- `FinancialService` - Lógica financeira

## 📝 Notas Importantes

### Limpeza Realizada
- ❌ Removido todo código relacionado ao Pluggy API
- ❌ Removidas dependências não utilizadas
- ✅ Sistema agora funciona com dados locais/Firebase
- ✅ Build limpo sem erros

### Performance
- Bundle inicial: 379.39 kB comprimido
- Lazy loading implementado
- Assets otimizados

## 🆘 Suporte

Se houver problemas no deploy:

1. **Verificar .htaccess:** Confirmar que foi copiado corretamente
2. **Verificar permissões:** Arquivos devem ter permissão de leitura
3. **Verificar URL:** Acessar `devcardoso.com/agrana` (com /agrana)
4. **Console do navegador:** Verificar erros JavaScript

## 🔄 Comandos de Desenvolvimento

Para desenvolvimento futuro:

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm start

# Build para produção
npm run build:deploy

# Testar localmente
npm run serve:prod
```

---

**Status:** ✅ **Aplicação pronta para produção em devcardoso.com/agrana**
