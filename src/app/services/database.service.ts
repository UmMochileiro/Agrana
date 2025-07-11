import { Injectable, Injector } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, onSnapshot, query, where, orderBy, addDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

// Validação de segurança
const validateUserAccess = (userId: string, currentUserId: string) => {
  if (!currentUserId) {
    throw new Error('Usuário não autenticado');
  }
  if (userId !== currentUserId) {
    throw new Error('Acesso negado: dados de outro usuário');
  }
};

// Interfaces para as coleções do banco de dados
export interface UserProfile {
  id?: string;
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    currency: string;
    language: string;
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}

export interface Account {
  id?: string;
  userId: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'credit' | 'cash';
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  institution?: string;
}

export interface Category {
  id?: string;
  userId: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id?: string;
  userId: string;
  accountId: string;
  categoryId: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  location?: string;
  notes?: string;
  attachments?: string[];
}

export interface Budget {
  id?: string;
  userId: string;
  name: string;
  categoryId: string;
  amount: number;
  spent: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  id?: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  type: 'savings' | 'debt' | 'investment';
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
}

export interface Recurring {
  id?: string;
  userId: string;
  accountId: string;
  categoryId: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextDue: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(
    private firestore: Firestore
  ) {}

  // Criar estrutura inicial para um novo usuário
  async createUserDatabase(userId: string, email: string, displayName: string) {
    try {
      // 1. Criar perfil do usuário
      await this.createUserProfile(userId, email, displayName);
      
      // 2. Criar contas padrão
      await this.createDefaultAccounts(userId);
      
      // 3. Criar categorias padrão
      await this.createDefaultCategories(userId);
      
      // 4. Criar metas padrão
      await this.createDefaultGoals(userId);
      
      console.log('Estrutura de banco de dados criada com sucesso para o usuário:', userId);
      
    } catch (error) {
      console.error('Erro ao criar estrutura do banco de dados:', error);
      throw error;
    }
  }

  // Criar perfil do usuário
  private async createUserProfile(userId: string, email: string, displayName: string) {
    const userProfile: UserProfile = {
      uid: userId,
      email,
      displayName,
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        currency: 'BRL',
        language: 'pt-BR',
        notifications: true,
        theme: 'light'
      }
    };

    const docRef = doc(this.firestore, 'users', userId);
    await setDoc(docRef, userProfile);
  }

  // Criar contas padrão
  private async createDefaultAccounts(userId: string) {
    const defaultAccounts: Omit<Account, 'id'>[] = [
      {
        userId,
        name: 'Conta Corrente',
        type: 'checking',
        balance: 0,
        currency: 'BRL',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Conta corrente principal',
        institution: 'Banco'
      },
      {
        userId,
        name: 'Poupança',
        type: 'savings',
        balance: 0,
        currency: 'BRL',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Conta poupança',
        institution: 'Banco'
      },
      {
        userId,
        name: 'Dinheiro',
        type: 'cash',
        balance: 0,
        currency: 'BRL',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Dinheiro em espécie'
      }
    ];

    const accountsRef = collection(this.firestore, 'accounts');
    for (const account of defaultAccounts) {
      await addDoc(accountsRef, account);
    }
  }

  // Criar categorias padrão
  private async createDefaultCategories(userId: string) {
    const defaultCategories: Omit<Category, 'id'>[] = [
      // Categorias de Receita
      {
        userId,
        name: 'Salário',
        type: 'income',
        color: '#4CAF50',
        icon: 'briefcase-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId,
        name: 'Freelance',
        type: 'income',
        color: '#2196F3',
        icon: 'laptop-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId,
        name: 'Investimentos',
        type: 'income',
        color: '#FF9800',
        icon: 'trending-up-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId,
        name: 'Vendas',
        type: 'income',
        color: '#9C27B0',
        icon: 'storefront-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Categorias de Despesa
      {
        userId,
        name: 'Alimentação',
        type: 'expense',
        color: '#F44336',
        icon: 'restaurant-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId,
        name: 'Moradia',
        type: 'expense',
        color: '#795548',
        icon: 'home-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId,
        name: 'Transporte',
        type: 'expense',
        color: '#607D8B',
        icon: 'car-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId,
        name: 'Saúde',
        type: 'expense',
        color: '#E91E63',
        icon: 'medical-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId,
        name: 'Educação',
        type: 'expense',
        color: '#3F51B5',
        icon: 'school-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId,
        name: 'Lazer',
        type: 'expense',
        color: '#FFEB3B',
        icon: 'game-controller-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId,
        name: 'Compras',
        type: 'expense',
        color: '#FF5722',
        icon: 'bag-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId,
        name: 'Outros',
        type: 'expense',
        color: '#9E9E9E',
        icon: 'ellipsis-horizontal-outline',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const categoriesRef = collection(this.firestore, 'categories');
    for (const category of defaultCategories) {
      await addDoc(categoriesRef, category);
    }
  }

  // Criar metas padrão
  private async createDefaultGoals(userId: string) {
    const defaultGoals: Omit<Goal, 'id'>[] = [
      {
        userId,
        name: 'Fundo de Emergência',
        targetAmount: 10000,
        currentAmount: 0,
        targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 ano
        type: 'savings',
        priority: 'high',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Reserva de emergência equivalente a 6 meses de gastos'
      },
      {
        userId,
        name: 'Viagem de Férias',
        targetAmount: 5000,
        currentAmount: 0,
        targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 meses
        type: 'savings',
        priority: 'medium',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Economizar para viagem de férias'
      }
    ];

    const goalsRef = collection(this.firestore, 'goals');
    for (const goal of defaultGoals) {
      await addDoc(goalsRef, goal);
    }
  }

  // Métodos para manipular dados

  // Adicionar transação
  async addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) {
    // Sanitizar dados
    const sanitizedTransaction = {
      ...transaction,
      amount: Math.abs(Number(transaction.amount)),
      description: String(transaction.description).trim(),
      date: new Date(transaction.date),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const transactionsRef = collection(this.firestore, 'transactions');
    const docRef = await addDoc(transactionsRef, sanitizedTransaction);
    
    // Atualizar saldo da conta
    await this.updateAccountBalance(transaction.accountId, transaction.amount, transaction.type);
    
    return docRef;
  }

  // Atualizar saldo da conta
  private async updateAccountBalance(accountId: string, amount: number, type: 'income' | 'expense' | 'transfer') {
    const accountRef = doc(this.firestore, 'accounts', accountId);
    const accountDoc = await getDoc(accountRef);
    
    if (accountDoc.exists()) {
      const accountData = accountDoc.data() as Account;
      const newBalance = type === 'income' 
        ? accountData.balance + amount 
        : accountData.balance - amount;
      
      await updateDoc(accountRef, { 
        balance: newBalance,
        updatedAt: new Date()
      });
    }
  }

  // Obter dados do usuário
  getUserData(userId: string): Observable<UserProfile | null> {
    return new Observable(observer => {
      const userRef = doc(this.firestore, 'users', userId);
      return onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          observer.next({ id: doc.id, ...doc.data() } as UserProfile);
        } else {
          observer.next(null);
        }
      });
    });
  }

  // Obter contas do usuário
  getUserAccounts(userId: string): Observable<Account[]> {
    return new Observable(observer => {
      const accountsRef = collection(this.firestore, 'accounts');
      const q = query(accountsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
      
      return onSnapshot(q, (snapshot) => {
        const accounts: Account[] = [];
        snapshot.forEach((doc) => {
          accounts.push({ id: doc.id, ...doc.data() } as Account);
        });
        observer.next(accounts);
      });
    });
  }

  // Obter categorias do usuário
  getUserCategories(userId: string): Observable<Category[]> {
    return new Observable(observer => {
      const categoriesRef = collection(this.firestore, 'categories');
      const q = query(categoriesRef, where('userId', '==', userId), orderBy('name', 'asc'));
      
      return onSnapshot(q, (snapshot) => {
        const categories: Category[] = [];
        snapshot.forEach((doc) => {
          categories.push({ id: doc.id, ...doc.data() } as Category);
        });
        observer.next(categories);
      });
    });
  }

  // Obter transações do usuário
  getUserTransactions(userId: string, limit?: number): Observable<Transaction[]> {
    return new Observable(observer => {
      const transactionsRef = collection(this.firestore, 'transactions');
      let q = query(transactionsRef, where('userId', '==', userId), orderBy('date', 'desc'));
      
      if (limit) {
        q = query(transactionsRef, where('userId', '==', userId), orderBy('date', 'desc'));
      }
      
      return onSnapshot(q, (snapshot) => {
        const transactions: Transaction[] = [];
        snapshot.forEach((doc) => {
          transactions.push({ id: doc.id, ...doc.data() } as Transaction);
        });
        observer.next(transactions);
      });
    });
  }

  // Obter metas do usuário
  getUserGoals(userId: string): Observable<Goal[]> {
    return new Observable(observer => {
      const goalsRef = collection(this.firestore, 'goals');
      const q = query(goalsRef, where('userId', '==', userId), orderBy('priority', 'desc'));
      
      return onSnapshot(q, (snapshot) => {
        const goals: Goal[] = [];
        snapshot.forEach((doc) => {
          goals.push({ id: doc.id, ...doc.data() } as Goal);
        });
        observer.next(goals);
      });
    });
  }

  // Atualizar perfil do usuário
  async updateUserProfile(userId: string, currentUserId: string, updates: Partial<UserProfile>): Promise<void> {
    validateUserAccess(userId, currentUserId);
    
    const userRef = doc(this.firestore, 'users', userId);
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };
    
    await updateDoc(userRef, updateData);
  }

  // Atualizar preferências do usuário
  async updateUserPreferences(userId: string, currentUserId: string, preferences: Partial<UserProfile['preferences']>): Promise<void> {
    validateUserAccess(userId, currentUserId);
    
    const userRef = doc(this.firestore, 'users', userId);
    const updateData = {
      preferences,
      updatedAt: new Date()
    };
    
    await updateDoc(userRef, updateData);
  }

  // Obter preferências do usuário
  async getUserPreferences(userId: string, currentUserId: string): Promise<UserProfile['preferences'] | null> {
    validateUserAccess(userId, currentUserId);
    
    const userRef = doc(this.firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserProfile;
      return userData.preferences || {
        currency: 'BRL',
        language: 'pt-BR',
        notifications: true,
        theme: 'light'
      };
    }
    
    return null;
  }

  // Calcular totais
  calculateTotalBalance(accounts: Account[]): number {
    return accounts.reduce((total, account) => total + account.balance, 0);
  }

  // Calcular gastos mensais
  calculateMonthlyExpenses(transactions: Transaction[]): number {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return transactions
      .filter(t => t.type === 'expense' && t.date >= startOfMonth)
      .reduce((total, t) => total + t.amount, 0);
  }

  // Calcular gastos por categoria
  calculateCategoryExpenses(transactions: Transaction[], categories: Category[]): Map<string, number> {
    const categoryExpenses = new Map<string, number>();
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const current = categoryExpenses.get(t.categoryId) || 0;
        categoryExpenses.set(t.categoryId, current + t.amount);
      });
    
    return categoryExpenses;
  }
}
