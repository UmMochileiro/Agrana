# Agrana - App Financeiro

## 🚀 Deploy para devcardoso.com/agrana

### Preparação para Deploy

O projeto está configurado para ser deployado em uma subpasta `/agrana` do domínio.

### Comandos de Build

```bash
# Build para produção
npm run build:prod

# Build específico para deploy (com base href correto)
npm run build:deploy
```

### Estrutura de Deploy

Após o build, os arquivos estarão na pasta `www/` e devem ser enviados para:
```
devcardoso.com/agrana/
```

### Configurações Aplicadas

1. **Base Href**: Configurado para `/agrana/`
2. **Environment**: URLs atualizadas para produção
3. **Roteamento**: `.htaccess` configurado para SPA
4. **Assets**: Otimizados para cache e compressão

### Arquivos de Deploy

- `www/` - Pasta com todos os arquivos buildados
- `.htaccess` - Configuração de servidor (incluído automaticamente)

### Instruções de Upload

1. Execute `npm run build:deploy`
2. Faça upload de todos os arquivos da pasta `www/` para:
   - Servidor: `devcardoso.com`
   - Pasta: `/public_html/agrana/` (ou similar)

### URLs de Acesso

- **Produção**: https://devcardoso.com/agrana
- **Desenvolvimento**: http://localhost:4200

### Funcionalidades

- ✅ Sistema de autenticação (Firebase)
- ✅ Dashboard financeiro
- ✅ Gestão de transações
- ✅ Relatórios e análises
- ✅ Interface responsiva (PWA ready)
- ✅ Roteamento configurado para subpasta

### Tecnologias

- Angular 20
- Ionic 8
- Firebase Authentication
- TypeScript
- SCSS

### Estrutura do Projeto

```
src/
├── app/
│   ├── paginas/          # Páginas da aplicação
│   │   ├── dashboard/    # Dashboard principal
│   │   ├── transacoes/   # Gestão de transações
│   │   ├── login/        # Autenticação
│   │   └── ...
│   ├── services/         # Serviços
│   └── guards/           # Guards de roteamento
├── environments/         # Configurações de ambiente
└── assets/              # Recursos estáticos
```

### Suporte

Para dúvidas ou problemas, consulte a documentação do Angular ou entre em contato.
