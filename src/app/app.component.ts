
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IonApp, IonRouterOutlet, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { addIcons } from 'ionicons';
import { home, statsChart, add, close, remove, trophy, swapHorizontal, swapVertical } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet, IonIcon, CommonModule],
})
export class AppComponent {
  showBottomMenu = false;
  showFinanceMenu = false;
  currentRoute = '';

  // Rotas onde o menu deve aparecer
  private menuRoutes = ['/dashboard', '/relatorios'];
  
  // Rotas onde o menu NÃO deve aparecer
  private noMenuRoutes = ['/login', '/register', '/inicio', '/'];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    addIcons({ home, statsChart, add, close, remove, trophy, swapVertical });
    this.setupRouterListener();
  }

  private setupRouterListener() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.updateMenuVisibility();
        this.closeFinanceMenu(); // Fechar menu de finanças ao navegar
      }
    });
  }

  private updateMenuVisibility() {
    // Esconder menu em páginas de auth ou inicial
    if (this.noMenuRoutes.includes(this.currentRoute)) {
      this.showBottomMenu = false;
      return;
    }

    // Mostrar menu apenas se usuário estiver logado
    this.authService.user$.subscribe(user => {
      this.showBottomMenu = !!user && this.menuRoutes.includes(this.currentRoute);
    });
  }

  navigateTo(route: string) {
    this.closeFinanceMenu();
    this.router.navigate([route]);
  }

  toggleFinanceMenu() {
    this.showFinanceMenu = !this.showFinanceMenu;
  }

  closeFinanceMenu() {
    this.showFinanceMenu = false;
  }

  openFinanceForm(type: 'entrada' | 'saida') {
    this.closeFinanceMenu();
    
    // Navegar para dashboard e disparar evento para abrir o formulário
    if (this.currentRoute !== '/dashboard') {
      this.router.navigate(['/dashboard']);
    }
    
    // Aguardar navegação e então disparar evento
    setTimeout(() => {
      const event = new CustomEvent('openFinanceForm', { 
        detail: { type } 
      });
      window.dispatchEvent(event);
    }, 100);
  }
}
