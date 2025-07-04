# Agrana - Sistema de Gerenciamento Financeiro

## 🔐 Segurança e Configuração

### Configuração do Firebase/Firestore

Este projeto usa Firebase/Firestore para gerenciar dados financeiros. A segurança é uma prioridade máxima.

#### 📋 Checklist de Segurança

- [x] Regras de segurança do Firestore implementadas
- [x] Validação de usuário em todas as operações
- [x] Arquivos sensíveis no .gitignore
- [x] Validação de acesso no DatabaseService
- [x] Autenticação obrigatória para todas as operações

#### 🛡️ Regras de Segurança Implementadas

1. **Isolamento de Dados**: Cada usuário só pode acessar seus próprios dados
2. **Autenticação Obrigatória**: Todas as operações requerem autenticação
3. **Validação de Proprietário**: Verificação se o usuário é dono dos dados
4. **Negação por Padrão**: Acesso negado a qualquer documento não especificado

#### 🔑 Configuração de Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`
2. Preencha com suas credenciais reais do Firebase
3. **NUNCA** commite o arquivo `.env` com dados reais

#### 🚀 Deploy de Regras de Segurança

Para aplicar as regras de segurança no Firebase:

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Fazer login
firebase login

# Deployar regras
firebase deploy --only firestore:rules
```

#### 📱 Estrutura de Dados

```
users/{userId}
├── accounts/{accountId}
├── categories/{categoryId}
├── transactions/{transactionId}
├── goals/{goalId}
├── budgets/{budgetId}
└── recurring/{recurringId}
```

#### 🔒 Funcionalidades de Segurança

1. **Validação de Acesso**: Função `validateUserAccess()` em todos os métodos
2. **Sanitização de Dados**: Validação de entrada em todas as operações
3. **Auditoria**: Timestamps automáticos em todas as operações
4. **Isolamento**: Cada usuário tem acesso apenas aos próprios dados

#### ⚠️ Importante

- Mantenha as regras de segurança sempre atualizadas
- Teste regularmente as regras de segurança
- Monitore logs do Firebase para tentativas de acesso não autorizadas
- Use HTTPS em produção
- Implemente rate limiting se necessário

#### 🧪 Testes de Segurança

```bash
# Testar regras de segurança localmente
firebase emulators:start --only firestore

# Executar testes de segurança
npm run test:security
```

## 🚀 Como Usar

### Pré-requisitos

- Node.js 18+
- Ionic CLI
- Firebase CLI
- Conta no Firebase

### Instalação

```bash
# Instalar dependências
npm install

# Configurar Firebase
firebase init

# Executar em desenvolvimento
ionic serve

# Build para produção
ionic build
```

### Estrutura do Projeto

```
src/
├── app/
│   ├── services/
│   │   ├── auth.service.ts          # Autenticação
│   │   ├── database.service.ts      # Banco de dados
│   │   └── financial.service.ts     # Lógica financeira
│   └── paginas/
│       ├── dashboard/               # Dashboard principal
│       ├── login/                   # Login
│       └── register/                # Cadastro
├── environments/                    # Configurações de ambiente
└── theme/                          # Temas e estilos
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**⚠️ ATENÇÃO**: Este é um sistema de gerenciamento financeiro. Mantenha sempre as melhores práticas de segurança e nunca exponha dados sensíveis.
