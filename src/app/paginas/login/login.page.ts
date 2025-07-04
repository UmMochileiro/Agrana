import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonCard, 
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  ToastController,
  MenuController
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton, 
    IonCard, 
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonText,
    CommonModule, 
    FormsModule,
    RouterLink
  ]
})
export class LoginPage implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    // Desabilitar o menu na página de login
    this.menuController.enable(false);
  }

  ngOnDestroy() {
    // Reabilitar o menu quando sair da página de login
    this.menuController.enable(true);
  }

  async login() {
    if (!this.email || !this.password) {
      this.showToast('Por favor, preencha todos os campos', 'warning');
      return;
    }

    this.isLoading = true;
    
    try {
      await this.authService.login(this.email, this.password);
      this.showToast('Login realizado com sucesso!', 'success');
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Login error:', error);
      this.showToast(this.getErrorMessage(error.code), 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async register() {
    if (!this.email || !this.password) {
      this.showToast('Por favor, preencha todos os campos', 'warning');
      return;
    }

    this.isLoading = true;
    
    try {
      await this.authService.register(this.email, this.password);
      this.showToast('Conta criada com sucesso!', 'success');
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Register error:', error);
      this.showToast(this.getErrorMessage(error.code), 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    toast.present();
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuário não encontrado';
      case 'auth/wrong-password':
        return 'Senha incorreta';
      case 'auth/email-already-in-use':
        return 'Email já está em uso';
      case 'auth/weak-password':
        return 'Senha deve ter pelo menos 6 caracteres';
      case 'auth/invalid-email':
        return 'Email inválido';
      default:
        return 'Erro de autenticação. Tente novamente.';
    }
  }
}
