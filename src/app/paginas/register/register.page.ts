import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonIcon, 
  IonCheckbox,
  IonSpinner,
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  walletOutline, 
  personOutline, 
  mailOutline, 
  lockClosedOutline, 
  eyeOutline, 
  eyeOffOutline, 
  logoGoogle 
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonCheckbox,
    IonSpinner,
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class RegisterPage implements OnInit {
  
  registerData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({
      walletOutline,
      personOutline,
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      logoGoogle
    });
  }

  ngOnInit() {
    // Verificar se usuário já está logado
    this.authService.user$.subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onRegister() {
    this.errorMessage = '';
    
    // Validações
    if (!this.registerData.fullName || !this.registerData.email || !this.registerData.password) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios';
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }

    if (this.registerData.password.length < 6) {
      this.errorMessage = 'A senha deve ter no mínimo 6 caracteres';
      return;
    }

    if (!this.registerData.acceptTerms) {
      this.errorMessage = 'Você deve aceitar os termos de uso';
      return;
    }

    this.isLoading = true;

    try {
      // Registrar usuário
      await this.authService.register(
        this.registerData.email, 
        this.registerData.password,
        this.registerData.fullName
      );

      // Mostrar toast de sucesso
      await this.presentToast('Conta criada com sucesso!', 'success');
      
      // Redirecionar para dashboard
      this.router.navigate(['/dashboard']);
      
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      
      // Tratar erros específicos do Firebase
      let errorMsg = 'Erro ao criar conta. Tente novamente.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMsg = 'Este email já está em uso. Tente fazer login.';
      } else if (error.code === 'auth/weak-password') {
        errorMsg = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'Email inválido. Verifique o formato.';
      }
      
      this.errorMessage = errorMsg;
      await this.presentToast(errorMsg, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async registerWithGoogle() {
    this.isLoading = true;
    
    try {
      await this.authService.signInWithGoogle();
      await this.presentToast('Conta criada com sucesso!', 'success');
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Erro ao registrar com Google:', error);
      this.errorMessage = 'Erro ao criar conta com Google. Tente novamente.';
      await this.presentToast('Erro ao criar conta com Google', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  private async presentToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    toast.present();
  }

  // Método para limpar o formulário
  resetForm() {
    this.registerData = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    };
    this.errorMessage = '';
    this.showPassword = false;
    this.showConfirmPassword = false;
  }
}
