import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FinancialService, DashboardData } from '../../services/financial.service';
import { DatabaseService, Transaction, Account, Category } from '../../services/database.service';
import { Observable, Subscription } from 'rxjs';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardContent, 
  IonButton, 
  IonIcon, 
  IonAvatar, 
  IonModal, 
  IonItem, 
  IonLabel, 
  IonSelect, 
  IonSelectOption, 
  IonInput, 
  IonButtons, 
  IonList, 
  IonPopover 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, 
    FormsModule,
    RouterLink,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonCard, 
    IonCardContent, 
    IonButton, 
    IonIcon, 
    IonAvatar, 
    IonModal, 
    IonItem, 
    IonLabel, 
    IonSelect, 
    IonSelectOption, 
    IonInput, 
    IonButtons, 
    IonList, 
    IonPopover
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
  
  // Dados do dashboard (calculados dinamicamente)
  totalBalance = 0;
  checking = 0;
  savings = 0;
  investment = 0;
  
  monthlyExpenses = 0;
  housing = 0;
  food = 0;
  transportation = 0;
  others = 0;
  
  savingsGoal = 0;
  savingsProgress = 0;
  savingsPercentage = 0;
  
  recentTransactions: any[] = [];

  // Controle do formulário de nova transação
  showAddTransactionForm = false;
  transactionType: 'entrada' | 'saida' = 'entrada';
  newTransaction = {
    name: '',
    amount: 0,
    category: ''
  };

  // Controle do menu do usuário
  showUserMenu = false;

  constructor(
    private authService: AuthService,
    private financialService: FinancialService,
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obter dados do usuário autenticado
    this.loadUserData();
    // Carregar dados financeiros consolidados
    this.loadFinancialData();
    // Escutar eventos do menu inferior global
    this.setupGlobalMenuListener();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    // Remover listener do evento global
    window.removeEventListener('openFinanceForm', this.handleOpenFinanceForm);
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
    return data.categoryExpenses.get(categoryName) || 0;
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

  private resetNewTransactionForm() {
    this.newTransaction = {
      name: '',
      amount: 0,
      category: ''
    };
  }

  toggleAddTransactionForm() {
    this.showAddTransactionForm = !this.showAddTransactionForm;
    if (!this.showAddTransactionForm) {
      this.resetNewTransactionForm();
    }
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  // Métodos para navegação
  goToTransactions() {
    this.router.navigate(['/transacoes']);
  }

  goToSettings() {
    this.router.navigate(['/configuracoes-app']);
  }

  // Listeners de eventos globais
  private setupGlobalMenuListener() {
    window.addEventListener('openFinanceForm', this.handleOpenFinanceForm);
  }

  private handleOpenFinanceForm = (event: any) => {
    const formType = event.detail?.type || 'entrada';
    this.openTransactionForm(formType);
  };

  // Logout
  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
}
