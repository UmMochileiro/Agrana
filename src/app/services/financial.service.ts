import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { AuthService } from './auth.service';
import { DatabaseService, Account, Transaction, Category, Goal } from './database.service';

// Interface para dados consolidados do dashboard
export interface DashboardData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  accounts: Account[];
  recentTransactions: Transaction[];
  categories: Category[];
  goals: Goal[];
  categoryExpenses: Map<string, number>;
}

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  private dashboardDataSubject = new BehaviorSubject<DashboardData | null>(null);
  public dashboardData$ = this.dashboardDataSubject.asObservable();

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService
  ) {
    // Observar mudanças no usuário autenticado
    this.authService.user$.subscribe(user => {
      if (user) {
        this.loadDashboardData(user.uid);
      } else {
        this.dashboardDataSubject.next(null);
      }
    });
  }

  // Carregar dados consolidados do dashboard
  private loadDashboardData(userId: string) {
    // Combinar todos os observables necessários
    const accounts$ = this.databaseService.getUserAccounts(userId);
    const transactions$ = this.databaseService.getUserTransactions(userId, 100);
    const categories$ = this.databaseService.getUserCategories(userId);
    const goals$ = this.databaseService.getUserGoals(userId);

    // Combinar todos os dados
    combineLatest([accounts$, transactions$, categories$, goals$])
      .pipe(
        map(([accounts, transactions, categories, goals]) => {
          const totalBalance = this.databaseService.calculateTotalBalance(accounts);
          const monthlyExpenses = this.databaseService.calculateMonthlyExpenses(transactions);
          const categoryExpenses = this.databaseService.calculateCategoryExpenses(transactions, categories);
          
          // Calcular receita mensal
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const monthlyIncome = transactions
            .filter(t => t.type === 'income' && t.date >= startOfMonth)
            .reduce((total, t) => total + t.amount, 0);

          // Pegar transações recentes (últimos 7 dias)
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          const recentTransactions = transactions
            .filter(t => t.date >= sevenDaysAgo)
            .slice(0, 10);

          const dashboardData: DashboardData = {
            totalBalance,
            monthlyIncome,
            monthlyExpenses,
            accounts,
            recentTransactions,
            categories,
            goals,
            categoryExpenses
          };

          return dashboardData;
        })
      )
      .subscribe(data => {
        this.dashboardDataSubject.next(data);
      });
  }

  // Adicionar transação
  async addTransaction(
    accountId: string,
    categoryId: string,
    amount: number,
    type: 'income' | 'expense',
    description: string,
    date?: Date
  ) {
    const user = this.authService.getCurrentUser();
    if (!user) throw new Error('Usuário não autenticado');

    const transaction = {
      userId: user.uid,
      accountId,
      categoryId,
      amount,
      type,
      description,
      date: date || new Date()
    };

    return await this.databaseService.addTransaction(transaction);
  }

  // Obter dados atuais do dashboard
  getCurrentDashboardData(): DashboardData | null {
    return this.dashboardDataSubject.value;
  }

  // Obter conta por tipo
  getAccountByType(type: 'checking' | 'savings' | 'investment' | 'cash'): Account | null {
    const data = this.getCurrentDashboardData();
    if (!data) return null;
    
    return data.accounts.find(account => account.type === type) || null;
  }

  // Obter categoria por nome
  getCategoryByName(name: string, type: 'income' | 'expense'): Category | null {
    const data = this.getCurrentDashboardData();
    if (!data) return null;
    
    return data.categories.find(category => 
      category.name.toLowerCase() === name.toLowerCase() && 
      category.type === type
    ) || null;
  }

  // Obter gastos por categoria específica
  getCategoryExpense(categoryName: string): number {
    const data = this.getCurrentDashboardData();
    if (!data) return 0;
    
    const category = data.categories.find(cat => 
      cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    
    if (!category) return 0;
    
    return data.categoryExpenses.get(category.id!) || 0;
  }

  // Métodos de conveniência para o dashboard
  getTotalBalance(): number {
    return this.getCurrentDashboardData()?.totalBalance || 0;
  }

  getMonthlyExpenses(): number {
    return this.getCurrentDashboardData()?.monthlyExpenses || 0;
  }

  getCheckingBalance(): number {
    const account = this.getAccountByType('checking');
    return account?.balance || 0;
  }

  getSavingsBalance(): number {
    const account = this.getAccountByType('savings');
    return account?.balance || 0;
  }

  getHousingExpenses(): number {
    return this.getCategoryExpense('Moradia');
  }

  getFoodExpenses(): number {
    return this.getCategoryExpense('Alimentação');
  }

  getTransportationExpenses(): number {
    return this.getCategoryExpense('Transporte');
  }

  getRecentTransactions(): Transaction[] {
    return this.getCurrentDashboardData()?.recentTransactions || [];
  }

  getGoals(): Goal[] {
    return this.getCurrentDashboardData()?.goals || [];
  }

  // Obter meta principal (primeira meta ativa)
  getPrimaryGoal(): Goal | null {
    const goals = this.getGoals();
    return goals.find(goal => !goal.isCompleted) || null;
  }
}
