import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle,
  IonIcon,
  IonButton,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSpinner,
  IonRefresher,
  IonRefresherContent
} from '@ionic/angular/standalone';
import { SegmentValue } from '@ionic/core';
import { addIcons } from 'ionicons';
import { 
  filter, 
  search, 
  trendingUp, 
  trendingDown, 
  receiptOutline, 
  add,
  arrowUpOutline,
  arrowDownOutline,
  swapHorizontalOutline,
  refresh,
  flask
} from 'ionicons/icons';
import { AlertController, LoadingController } from '@ionic/angular';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: Date;
  description?: string;
  accountId?: string;
  bankName?: string;
}

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.page.html',
  styleUrls: ['./transacoes.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle,
    IonIcon,
    IonButton,
    IonButtons,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSpinner,
    IonRefresher,
    IonRefresherContent,
    CommonModule, 
    FormsModule
  ]
})
export class TransacoesPage implements OnInit {

  transactions: Transaction[] = [];
  isLoading = false;
  selectedFilter = 'todas';

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({
      filter,
      search,
      trendingUp,
      trendingDown,
      receiptOutline,
      add,
      arrowUpOutline,
      arrowDownOutline,
      swapHorizontalOutline,
      refresh,
      flask
    });
  }

  async ngOnInit() {
    await this.loadTransactions();
  }

  async loadTransactions() {
    this.isLoading = true;
    
    try {
      // Carregar dados locais ou de outra fonte
      await this.loadLocalTransactions();
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async loadLocalTransactions() {
    // Por enquanto, deixar lista vazia
    // Aqui você pode implementar carregamento de dados locais ou de outra API
    this.transactions = [];
  }

  async refreshTransactions(event: any) {
    await this.loadTransactions();
    event.target.complete();
  }

  filterTransactions(filter: SegmentValue | undefined) {
    this.selectedFilter = (filter as string) || 'todas';
  }

  get filteredTransactions(): Transaction[] {
    switch (this.selectedFilter) {
      case 'entradas':
        return this.transactions.filter(t => t.type === 'income');
      case 'saidas':
        return this.transactions.filter(t => t.type === 'expense');
      default:
        return this.transactions;
    }
  }

  getTransactionIcon(type: string): string {
    switch (type) {
      case 'income':
        return 'arrow-up-outline';
      case 'expense':
        return 'arrow-down-outline';
      default:
        return 'swap-horizontal-outline';
    }
  }

  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  async testRandomTransaction() {
    const loading = await this.loadingController.create({
      message: 'Gerando transação aleatória...',
      spinner: 'circular'
    });
    
    await loading.present();
    
    try {
      // Simular delay
      await this.delay(1500);
      
      // Gerar transação aleatória
      const randomTransaction = this.generateRandomTransaction();
      
      // Adicionar à lista de transações
      this.transactions.unshift(randomTransaction);
      
      // Reordenar por data
      this.transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
      
      await loading.dismiss();
      
      // Mostrar resultado
      const alert = await this.alertController.create({
        header: '✅ Transação Criada!',
        message: `
          <strong>Nova transação adicionada:</strong><br><br>
          
          💰 <strong>Tipo:</strong> ${randomTransaction.type === 'income' ? 'Entrada' : 'Saída'}<br>
          📝 <strong>Descrição:</strong> ${randomTransaction.name}<br>
          🏷️ <strong>Categoria:</strong> ${randomTransaction.category}<br>
          💵 <strong>Valor:</strong> ${randomTransaction.type === 'income' ? '+' : '-'}R$ ${randomTransaction.amount.toFixed(2)}<br>
          📅 <strong>Data:</strong> ${randomTransaction.date.toLocaleDateString('pt-BR')}<br><br>
          
          <em>Transação simulada com sucesso!</em>
        `,
        buttons: ['OK']
      });
      
      await alert.present();
      
    } catch (error) {
      console.error('Erro ao gerar transação aleatória:', error);
      await loading.dismiss();
      
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Não foi possível gerar a transação aleatória.',
        buttons: ['OK']
      });
      
      await alert.present();
    }
  }

  generateRandomTransaction(): Transaction {
    const transactionTypes = ['income', 'expense'] as const;
    const incomeDescriptions = [
      'Salário Recebido',
      'Freelance - Projeto Web',
      'Venda de Produto',
      'Rendimento Investimento',
      'Cashback Cartão',
      'Reembolso',
      'Prêmio Sorteio',
      'Comissão Vendas'
    ];
    
    const expenseDescriptions = [
      'Compra Supermercado',
      'Pagamento Conta de Luz',
      'Combustível Posto',
      'Restaurante',
      'Farmácia',
      'Uber/Taxi',
      'Streaming Netflix',
      'Compra Online',
      'Pagamento PIX',
      'Transferência Bancária'
    ];
    
    const categories = [
      'Alimentação',
      'Transporte',
      'Saúde',
      'Entretenimento',
      'Salário',
      'Compras',
      'Serviços',
      'Investimentos'
    ];
    
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const descriptions = type === 'income' ? incomeDescriptions : expenseDescriptions;
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    // Gerar valor aleatório baseado no tipo
    const amount = type === 'income' 
      ? Math.floor(Math.random() * 5000) + 100  // R$ 100 - R$ 5100
      : Math.floor(Math.random() * 800) + 10;   // R$ 10 - R$ 810
    
    // Gerar data aleatória dos últimos 30 dias
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    return {
      id: 'tx_random_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      name: description,
      amount: amount,
      category: category,
      type: type,
      date: date,
      description: description,
      accountId: 'acc_random_' + Math.random().toString(36).substr(2, 9),
      bankName: 'Banco Simulado'
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Métodos para análise de despesas do mês
  getCurrentMonthExpenses(): Transaction[] {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return this.transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === 'expense' && 
             transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });
  }

  getExpensesByCategory(): { category: string; amount: number; percentage: number }[] {
    const currentMonthExpenses = this.getCurrentMonthExpenses();
    const totalExpenses = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);
    
    const categoryTotals: { [key: string]: number } = {};
    
    currentMonthExpenses.forEach(transaction => {
      const category = transaction.category;
      categoryTotals[category] = (categoryTotals[category] || 0) + transaction.amount;
    });
    
    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5); // Top 5 categorias
  }

  getCurrentMonthExpensesTotal(): number {
    return this.getCurrentMonthExpenses().reduce((sum, t) => sum + t.amount, 0);
  }

  getTopExpenseCategory(): string {
    const expensesByCategory = this.getExpensesByCategory();
    return expensesByCategory.length > 0 ? expensesByCategory[0].category : 'Nenhuma';
  }

  formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }
}
