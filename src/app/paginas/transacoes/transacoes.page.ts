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
  IonLabel
} from '@ionic/angular/standalone';
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
  swapHorizontalOutline
} from 'ionicons/icons';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: Date;
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
    CommonModule, 
    FormsModule
  ]
})
export class TransacoesPage implements OnInit {

  transactions: Transaction[] = [
    {
      id: '1',
      name: 'Salário',
      amount: 3500.00,
      category: 'Trabalho',
      type: 'income',
      date: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Supermercado',
      amount: 250.00,
      category: 'Alimentação',
      type: 'expense',
      date: new Date('2024-01-14')
    },
    {
      id: '3',
      name: 'Gasolina',
      amount: 180.00,
      category: 'Transporte',
      type: 'expense',
      date: new Date('2024-01-13')
    },
    {
      id: '4',
      name: 'Freelance',
      amount: 800.00,
      category: 'Trabalho',
      type: 'income',
      date: new Date('2024-01-12')
    }
  ];

  constructor() {
    addIcons({
      filter,
      search,
      trendingUp,
      trendingDown,
      receiptOutline,
      add,
      arrowUpOutline,
      arrowDownOutline,
      swapHorizontalOutline
    });
  }

  ngOnInit() {
    // Ordenar transações por data (mais recentes primeiro)
    this.transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
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
}
