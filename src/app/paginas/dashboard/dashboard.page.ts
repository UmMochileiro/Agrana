import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FinancialService, DashboardData } from '../../services/financial.service';
import { DatabaseService, Transaction, Account, Category } from '../../services/database.service';
import { Observable, Subscription } from 'rxjs';
import { 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonItem, 
  IonLabel, 
  IonButton, 
  IonIcon, 
  IonAvatar,
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  homeOutline, 
  callOutline, 
  settingsOutline, 
  personOutline, 
  trendingUpOutline,
  carOutline,
  restaurantOutline,
  homeSharp,
  cardOutline,
  addOutline,
  ellipseOutline, 
  walletOutline, 
  arrowUpOutline, 
  arrowDownOutline, 
  trendingDownOutline,
  home,
  statsChart,
  card,
  settings,
  logOut,
  closeOutline, 
  ellipsisHorizontal, 
  eye,
  trendingUp,
  add,
  swapHorizontalOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonCard, 
    IonCardContent, 
    IonItem, 
    IonLabel, 
    IonButton, 
    IonIcon, 
    IonAvatar,
    IonInput,
    IonSelect,
    IonSelectOption,
    CommonModule, 
    FormsModule,
    RouterLink
  ]
})
export class DashboardPage implements OnInit, OnDestroy {
  
  // Dados do usuário autenticado
  currentUser: any = null;
  userName: string = '';
  userEmail: string = '';
  
  // Dados financeiros consolidados
  dashboardData: DashboardData | null = null;
  
  // Subscriptions para limpar memória
  private subscriptions: Subscription[] = [];
  
  // Dados do dashboard (calculados a partir dos dados reais)
  totalBalance = 0;
  checking = 0;
  savings = 0;
  investment = 0;
  
  monthlyExpenses = 0;
  housing = 0;
  food = 0;
  transportation = 0;
  others = 0;
  
  savingsGoal = 5000; // Valor padrão para teste
  savingsProgress = 1500; // Valor padrão para teste
  savingsPercentage = 0;
  
  recentTransactions: Transaction[] = [];

  // Controle do formulário de nova transação
  showAddTransactionForm = false;
  transactionType: 'entrada' | 'saida' = 'entrada';
  newTransaction = {
    name: '',
    amount: 0,
    category: ''
  };

  constructor(
    private authService: AuthService,
    private financialService: FinancialService,
    private databaseService: DatabaseService,
    private router: Router
  ) {
    addIcons({
      walletOutline,
      arrowUpOutline,
      arrowDownOutline,
      addOutline,
      cardOutline,
      trendingUpOutline,
      trendingDownOutline,
      homeOutline,
      restaurantOutline,
      carOutline,
      trendingUp,
      ellipsisHorizontal,
      add,
      eye,
      closeOutline,
      home,
      statsChart,
      card,
      settings,
      logOut,
      callOutline,
      settingsOutline,
      personOutline,
      homeSharp,
      ellipseOutline,
      swapHorizontalOutline
    });
  }

  ngOnInit() {
    // Obter dados do usuário autenticado
    this.loadUserData();
    // Carregar dados financeiros consolidados
    this.loadFinancialData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadUserData() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.userName = this.getDisplayName(user);
        this.userEmail = user.email || '';
      }
    });
  }

  private getDisplayName(user: any): string {
    if (user.displayName) {
      return user.displayName;
    } else if (user.email) {
      return user.email.split('@')[0];
    }
    return 'Usuário';
  }

  private loadFinancialData() {
    // Observar dados consolidados do dashboard
    const dashboardSub = this.financialService.dashboardData$.subscribe(data => {
      if (data) {
        this.dashboardData = data;
        this.updateDashboardValues(data);
      }
    });
    this.subscriptions.push(dashboardSub);
  }

  private updateDashboardValues(data: DashboardData) {
    // Atualizar valores do dashboard com dados reais
    this.totalBalance = data.totalBalance;
    this.monthlyExpenses = data.monthlyExpenses;
    this.recentTransactions = data.recentTransactions;
    
    // Atualizar saldos das contas
    this.checking = this.getAccountBalance(data.accounts, 'checking');
    this.savings = this.getAccountBalance(data.accounts, 'savings');
    this.investment = this.getAccountBalance(data.accounts, 'investment');
    
    // Atualizar gastos por categoria
    this.housing = this.getCategoryExpense(data, 'Moradia');
    this.food = this.getCategoryExpense(data, 'Alimentação');
    this.transportation = this.getCategoryExpense(data, 'Transporte');
    
    // Atualizar metas
    const primaryGoal = data.goals.find(goal => !goal.isCompleted);
    if (primaryGoal) {
      this.savingsGoal = primaryGoal.targetAmount;
      this.savingsProgress = primaryGoal.currentAmount;
    }
  }

  private getAccountBalance(accounts: Account[], type: string): number {
    const account = accounts.find(acc => acc.type === type);
    return account ? account.balance : 0;
  }

  private getCategoryExpense(data: DashboardData, categoryName: string): number {
    const category = data.categories.find(cat => cat.name === categoryName);
    if (!category) return 0;
    
    return data.categoryExpenses.get(category.id!) || 0;
  }

  // Método para calcular valor absoluto
  getAbsoluteValue(value: number): number {
    return Math.abs(value);
  }

  // Método para obter saudação personalizada
  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Bom dia';
    } else if (hour < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }

  // Métodos para o formulário de transação
  openTransactionForm(type: 'entrada' | 'saida') {
    this.transactionType = type;
    this.showAddTransactionForm = true;
    this.resetNewTransactionForm();
  }

  closeTransactionForm() {
    this.showAddTransactionForm = false;
    this.resetNewTransactionForm();
  }

  async saveNewTransaction() {
    if (!this.newTransaction.name || !this.newTransaction.amount) {
      console.error('Nome e valor são obrigatórios');
      return;
    }

    if (!this.dashboardData) {
      console.error('Dados do dashboard não carregados');
      return;
    }

    // Encontrar conta padrão (primeira conta ativa)
    const defaultAccount = this.dashboardData.accounts.find(acc => acc.isActive);
    if (!defaultAccount) {
      console.error('Nenhuma conta encontrada');
      return;
    }

    // Encontrar categoria
    const categoryName = this.getCategoryNameFromValue(this.newTransaction.category);
    const category = this.dashboardData.categories.find(cat => 
      cat.name.toLowerCase() === categoryName.toLowerCase() && 
      cat.type === (this.transactionType === 'entrada' ? 'income' : 'expense')
    );

    if (!category) {
      console.error('Categoria não encontrada');
      return;
    }

    const amount = this.transactionType === 'entrada' 
      ? Math.abs(this.newTransaction.amount) 
      : Math.abs(this.newTransaction.amount);

    try {
      await this.financialService.addTransaction(
        defaultAccount.id!,
        category.id!,
        amount,
        this.transactionType === 'entrada' ? 'income' : 'expense',
        this.newTransaction.name
      );
      
      // Resetar formulário e esconder
      this.showAddTransactionForm = false;
      this.resetNewTransactionForm();
      
      console.log('Transação adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    }
  }

  private getCategoryNameFromValue(categoryValue: string): string {
    const categoryMap: { [key: string]: string } = {
      'salario': 'Salário',
      'freelance': 'Freelance',
      'investimento': 'Investimentos',
      'vendas': 'Vendas',
      'outros': 'Outros',
      'alimentacao': 'Alimentação',
      'moradia': 'Moradia',
      'transporte': 'Transporte',
      'saude': 'Saúde',
      'lazer': 'Lazer',
      'educacao': 'Educação',
      'compras': 'Compras'
    };
    
    return categoryMap[categoryValue] || 'Outros';
  }

  private resetNewTransactionForm() {
    this.newTransaction = {
      name: '',
      amount: 0,
      category: ''
    };
  }

  // Métodos para porcentagem de poupança
  calculateSavingsPercentage(): number {
    if (this.savingsGoal <= 0) return 0;
    const percentage = (this.savingsProgress / this.savingsGoal) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  }

  getSavingsPercentageFormatted(): string {
    const percentage = this.calculateSavingsPercentage();
    return Math.round(percentage).toString();
  }

  // Métodos de navegação
  cancelAddTransaction() {
    this.showAddTransactionForm = false;
    this.resetNewTransactionForm();
  }

  toggleAddTransactionForm() {
    this.showAddTransactionForm = !this.showAddTransactionForm;
    if (!this.showAddTransactionForm) {
      this.resetNewTransactionForm();
    }
  }

  // Método para logout
  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  // Método para obter ícone da transação
  getTransactionIcon(transaction: Transaction): string {
    if (transaction.type === 'income') {
      return 'arrow-up-outline';
    } else if (transaction.type === 'expense') {
      return 'arrow-down-outline';
    } else {
      return 'swap-horizontal-outline';
    }
  }
}
