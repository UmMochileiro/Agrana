# 💰 Agrana - Gerenciador Financeiro Pessoal

<div align="center">
  <img src="src/assets/icon/icon.png" alt="Agrana Logo" width="120" height="120">
  
  **Controle suas finanças de forma inteligente e segura**
  
  [![Ionic](https://img.shields.io/badge/Ionic-8.0-3880FF?style=flat-square&logo=ionic)](https://ionicframework.com/)
  [![Angular](https://img.shields.io/badge/Angular-18.0-DD0031?style=flat-square&logo=angular)](https://angular.io/)
  [![Firebase](https://img.shields.io/badge/Firebase-Latest-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
</div>

## 🌟 Sobre o Projeto

O **Agrana** é um aplicativo de gerenciamento financeiro pessoal moderno, seguro e intuitivo, desenvolvido com as mais recentes tecnologias web. Ele oferece controle completo sobre suas finanças pessoais com uma interface elegante e funcionalidades avançadas.

### ✨ Principais Funcionalidades

- 📊 **Dashboard Financeiro**: Visão geral completa das suas finanças
- 💳 **Gestão de Contas**: Controle múltiplas contas (corrente, poupança, investimentos)
- 📈 **Análise de Gastos**: Categorização automática e relatórios detalhados
- 🎯 **Metas Financeiras**: Defina e acompanhe seus objetivos
- 🔄 **Transações**: Registre receitas e despesas facilmente
- 🔐 **Segurança Total**: Autenticação Firebase e proteção de dados
- 📱 **Design Responsivo**: Interface moderna adaptada para todos os dispositivos

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Ionic** | 8.0+ | Framework para aplicações híbridas |
| **Angular** | 18.0+ | Framework web moderno |
| **Firebase** | Latest | Backend-as-a-Service |
| **Firestore** | Latest | Banco de dados NoSQL |
| **TypeScript** | 5.0+ | Linguagem de programação |
| **SCSS** | Latest | Pré-processador CSS |
| **Capacitor** | Latest | Native bridge para mobile |

## 📱 Screenshots

<div align="center">
  <img src="docs/screenshots/dashboard.png" alt="Dashboard" width="250">
  <img src="docs/screenshots/transactions.png" alt="Transações" width="250">
  <img src="docs/screenshots/goals.png" alt="Metas" width="250">
</div>

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Ionic CLI
- Firebase CLI (opcional)

### 1. Clone o Repositório

```bash
git clone https://github.com/UmMochileiro/Agrana.git
cd Agrana
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative Authentication e Firestore
3. Copie as credenciais do Firebase

### 4. Configuração do Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas credenciais
nano .env
```

Exemplo do arquivo `.env`:
```properties
FIREBASE_API_KEY=sua_api_key_aqui
FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
FIREBASE_PROJECT_ID=seu_projeto_id
FIREBASE_APP_ID=seu_app_id
```

### 5. Deploy das Regras de Segurança

```bash
# Instale o Firebase CLI
npm install -g firebase-tools

# Faça login no Firebase
firebase login

# Deploy das regras
firebase deploy --only firestore:rules,firestore:indexes
```

### 6. Execute o Aplicativo

```bash
# Desenvolvimento
ionic serve

# Build para produção
ionic build

# Build para mobile
ionic capacitor build android
ionic capacitor build ios
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── guards/                 # Proteção de rotas
│   ├── paginas/               # Páginas da aplicação
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── login/             # Página de login
│   │   └── register/          # Página de cadastro
│   ├── services/              # Serviços da aplicação
│   │   ├── auth.service.ts    # Autenticação
│   │   ├── database.service.ts # Banco de dados
│   │   └── financial.service.ts # Lógica financeira
│   └── app.routes.ts          # Rotas da aplicação
├── environments/              # Configurações de ambiente
├── theme/                     # Temas e estilos
└── assets/                    # Recursos estáticos
```

## � Segurança

### Medidas Implementadas

- ✅ **Autenticação Firebase**: Login seguro com email/senha e Google
- ✅ **Regras de Segurança**: Firestore com isolamento total de dados
- ✅ **Validação de Entrada**: Sanitização de todos os dados
- ✅ **Proteção de Rotas**: Guards para páginas protegidas
- ✅ **Variáveis de Ambiente**: Credenciais protegidas
- ✅ **Auditoria**: Logs de todas as operações

### Configuração de Segurança

1. **Firestore Rules**: Cada usuário acessa apenas seus dados
2. **Environment Variables**: Credenciais nunca expostas no código
3. **Input Validation**: Validação rigorosa de todos os inputs
4. **Route Protection**: Rotas protegidas por autenticação

## 🎨 Design System

### Cores Principais

- **Primary**: #667eea (Gradiente azul)
- **Secondary**: #764ba2 (Gradiente roxo)
- **Success**: #10dc60 (Verde)
- **Warning**: #ffce00 (Amarelo)
- **Danger**: #f04141 (Vermelho)

### Tipografia

- **Font Family**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI'
- **Font Sizes**: 12px, 14px, 16px, 18px, 20px, 24px, 32px

## � Funcionalidades Detalhadas

### Dashboard Financeiro
- Visão geral do saldo total
- Gráficos de gastos por categoria
- Transações recentes
- Metas de economia

### Gestão de Contas
- Múltiplas contas (corrente, poupança, investimentos)
- Transferências entre contas
- Histórico completo de movimentações

### Análise de Gastos
- Categorização automática
- Relatórios mensais e anuais
- Comparação de períodos
- Alertas de orçamento

### Metas Financeiras
- Definição de objetivos
- Acompanhamento de progresso
- Notificações de marcos
- Estratégias de economia

## 🚀 Roadmap

- [ ] **v2.0**: Modo escuro completo
- [ ] **v2.1**: Exportação de relatórios (PDF/Excel)
- [ ] **v2.2**: Integração com bancos (Open Banking)
- [ ] **v2.3**: Notificações push
- [ ] **v2.4**: Análise de investimentos
- [ ] **v2.5**: Planejamento financeiro IA

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

### Diretrizes de Contribuição

- Siga os padrões de código existentes
- Escreva testes para novas funcionalidades
- Documente mudanças no README
- Mantenha commits pequenos e focados
- Teste a segurança antes de fazer PR

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

<div align="center">
  <a href="https://github.com/UmMochileiro">
    <img src="https://github.com/UmMochileiro.png" alt="UmMochileiro" width="100" height="100" style="border-radius: 50%;">
  </a>
  <br>
  <strong>UmMochileiro</strong>
  <br>
  <em>Desenvolvedor Principal</em>
</div>

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/UmMochileiro/Agrana/issues)
- **Discussões**: [GitHub Discussions](https://github.com/UmMochileiro/Agrana/discussions)
- **Email**: [contato@agrana.app](mailto:contato@agrana.app)

---

<div align="center">
  <p>Desenvolvido com ❤️ por <strong>UmMochileiro</strong></p>
  <p>⭐ Se este projeto te ajudou, deixe uma estrela!</p>
</div>

