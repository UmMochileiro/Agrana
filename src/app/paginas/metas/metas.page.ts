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
  IonIcon,
  IonButton,
  IonButtons,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  add, 
  trophy, 
  trophyOutline,
  checkmarkCircle,
  timeOutline,
  closeCircle,
  calendarOutline,
  homeOutline,
  carOutline,
  schoolOutline,
  airplaneOutline,
  heartOutline
} from 'ionicons/icons';

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  progress: number;
  status: 'active' | 'completed' | 'overdue';
  icon: string;
  deadline?: Date;
  category: string;
}

@Component({
  selector: 'app-metas',
  templateUrl: './metas.page.html',
  styleUrls: ['./metas.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonCard, 
    IonCardContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonFab,
    IonFabButton,
    CommonModule, 
    FormsModule
  ]
})
export class MetasPage implements OnInit {

  goals: Goal[] = [
    {
      id: '1',
      title: 'Casa Própria',
      description: 'Entrada para financiamento da casa',
      target: 50000,
      current: 32000,
      progress: 64,
      status: 'active',
      icon: 'home-outline',
      deadline: new Date('2024-12-31'),
      category: 'Imóveis'
    },
    {
      id: '2',
      title: 'Carro Novo',
      description: 'Troca do carro atual',
      target: 25000,
      current: 25000,
      progress: 100,
      status: 'completed',
      icon: 'car-outline',
      category: 'Veículos'
    },
    {
      id: '3',
      title: 'Viagem Europa',
      description: 'Férias de verão na Europa',
      target: 15000,
      current: 8500,
      progress: 57,
      status: 'active',
      icon: 'airplane-outline',
      deadline: new Date('2024-06-15'),
      category: 'Viagens'
    },
    {
      id: '4',
      title: 'Curso de MBA',
      description: 'Especialização profissional',
      target: 12000,
      current: 12000,
      progress: 100,
      status: 'completed',
      icon: 'school-outline',
      category: 'Educação'
    },
    {
      id: '5',
      title: 'Reserva de Emergência',
      description: '6 meses de gastos essenciais',
      target: 18000,
      current: 9000,
      progress: 50,
      status: 'active',
      icon: 'heart-outline',
      category: 'Emergência'
    }
  ];

  constructor() {
    addIcons({
      add,
      trophy,
      trophyOutline,
      checkmarkCircle,
      timeOutline,
      closeCircle,
      calendarOutline,
      homeOutline,
      carOutline,
      schoolOutline,
      airplaneOutline,
      heartOutline
    });
  }

  ngOnInit() {
    this.updateGoalsProgress();
  }

  private updateGoalsProgress() {
    this.goals.forEach(goal => {
      goal.progress = Math.round((goal.current / goal.target) * 100);
      
      if (goal.progress >= 100) {
        goal.status = 'completed';
      } else if (goal.deadline && new Date() > goal.deadline) {
        goal.status = 'overdue';
      } else {
        goal.status = 'active';
      }
    });
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'overdue':
        return 'close-circle';
      case 'active':
      default:
        return 'time-outline';
    }
  }

  getCompletedGoalsCount(): number {
    return this.goals.filter(goal => goal.status === 'completed').length;
  }

  getTotalGoalsCount(): number {
    return this.goals.length;
  }

  getOverallProgress(): number {
    if (this.goals.length === 0) return 0;
    const totalProgress = this.goals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / this.goals.length);
  }
}
