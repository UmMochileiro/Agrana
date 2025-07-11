import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecuperarSenhaPage implements OnInit {

  email: string = '';
  isLoading: boolean = false;
  emailSent: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async enviarRecuperacao() {
    if (!this.email) {
      this.showError('Por favor, digite seu email.');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.showError('Por favor, digite um email válido.');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      // Enviar email de recuperação de senha usando o AuthService
      await this.authService.sendPasswordResetEmail(this.email);
      
      this.emailSent = true;
      this.successMessage = 'Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.';
      
    } catch (error: any) {
      console.error('Erro ao enviar email de recuperação:', error);
      
      // Traduzir mensagens de erro do Firebase
      switch (error.code) {
        case 'auth/user-not-found':
          this.showError('Não foi encontrada uma conta com este email.');
          break;
        case 'auth/invalid-email':
          this.showError('Email inválido.');
          break;
        case 'auth/too-many-requests':
          this.showError('Muitas tentativas. Tente novamente mais tarde.');
          break;
        default:
          this.showError('Erro ao enviar email de recuperação. Tente novamente.');
      }
    } finally {
      this.isLoading = false;
    }
  }

  async reenviarEmail() {
    if (this.emailSent) {
      await this.enviarRecuperacao();
    }
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  // Método para limpar mensagens quando o usuário começar a digitar
  onEmailChange() {
    this.errorMessage = '';
    this.successMessage = '';
  }

}
