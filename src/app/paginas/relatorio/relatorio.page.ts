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
  IonCardSubtitle,
  IonIcon,
  IonButton,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  download, 
  calendar, 
  wallet,
  arrowUp,
  arrowDown,
  trendingUp,
  trendingDown,
  pieChart,
  repeat,
  checkmarkCircle,
  alertCircle,
  informationCircle
} from 'ionicons/icons';

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface Insight {
  title: string;
  description: string;
  icon: string;
  type: 'success' | 'warning' | 'info';
}

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
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
    IonCardSubtitle,
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
export class RelatorioPage implements OnInit {

  totalBalance = 15430.50;
  totalIncome = 8250.00;
  totalExpenses = 6180.00;
  totalTransactions = 47;
  largestIncome = 3500.00;
  largestExpense = 1200.00;

  expenseCategories: ExpenseCategory[] = [
    {
      name: 'Alimentação',
      amount: 1850.00,
      percentage: 30,
      color: '#22c55e'
    },
    {
      name: 'Transporte',
      amount: 1240.00,
      percentage: 20,
      color: '#3b82f6'
    },
    {
      name: 'Moradia',
      amount: 2470.00,
      percentage: 40,
      color: '#f59e0b'
    },
    {
      name: 'Lazer',
      amount: 620.00,
      percentage: 10,
      color: '#ef4444'
    }
  ];

  insights: Insight[] = [
    {
      title: 'Gastos Controlados',
      description: 'Seus gastos estão 12% abaixo da média dos últimos meses. Continue assim!',
      icon: 'checkmark-circle',
      type: 'success'
    },
    {
      title: 'Atenção com Lazer',
      description: 'Os gastos com lazer aumentaram 25% este mês. Considere revisar este orçamento.',
      icon: 'alert-circle',
      type: 'warning'
    },
    {
      title: 'Meta de Poupança',
      description: 'Você está no caminho certo para atingir sua meta de poupança mensal.',
      icon: 'information-circle',
      type: 'info'
    }
  ];

  constructor() {
    addIcons({
      download,
      calendar,
      wallet,
      arrowUp,
      arrowDown,
      trendingUp,
      trendingDown,
      pieChart,
      repeat,
      checkmarkCircle,
      alertCircle,
      informationCircle
    });
  }

  ngOnInit() {
    this.calculatePercentages();
  }

  private calculatePercentages() {
    this.expenseCategories.forEach(category => {
      category.percentage = Math.round((category.amount / this.totalExpenses) * 100);
    });
  }

  getSavingsRate(): number {
    return Math.round(((this.totalIncome - this.totalExpenses) / this.totalIncome) * 100);
  }

  getAverageTransaction(): number {
    return this.totalExpenses / this.totalTransactions;
  }
}
