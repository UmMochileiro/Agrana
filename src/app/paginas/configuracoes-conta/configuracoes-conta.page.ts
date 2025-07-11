import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { DatabaseService, UserProfile } from '../../services/database.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, updateProfile, updatePassword } from '@angular/fire/auth';

@Component({
  selector: 'app-configuracoes-conta',
  templateUrl: './configuracoes-conta.page.html',
  styleUrls: ['./configuracoes-conta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConfiguracaoContaPage implements OnInit, OnDestroy {

  currentUser: User | null = null;
  userProfile: UserProfile | null = null;
  isLoading = false;
  private subscriptions: Subscription[] = [];

  profile = {
    nome: '',
    email: '',
    telefone: '',
    foto: 'assets/icon/favicon.png'
  };

  security = {
    twoFactor: false,
    notifications: true,
    biometric: true
  };

  // Campos para alteração de senha
  passwordChange = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private async loadUserData() {
    this.isLoading = true;
    
    try {
      // Obter usuário atual do Firebase Auth
      this.currentUser = await this.authService.getCurrentUser();
      
      if (this.currentUser) {
        // Carregar dados do perfil
        this.profile.nome = this.currentUser.displayName || '';
        this.profile.email = this.currentUser.email || '';
        this.profile.foto = this.currentUser.photoURL || 'assets/icon/favicon.png';
        
        // Observar dados do perfil no Firestore
        const userDataSub = this.databaseService.getUserData(this.currentUser.uid)
          .subscribe((userProfile) => {
            if (userProfile) {
              this.userProfile = userProfile;
              // Atualizar dados locais com dados do Firestore
              this.profile.nome = userProfile.displayName;
              this.profile.email = userProfile.email;
              this.security.notifications = userProfile.preferences?.notifications ?? true;
            }
          });
        
        this.subscriptions.push(userDataSub);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async salvarPerfil() {
    if (!this.currentUser) {
      console.error('Usuário não autenticado');
      return;
    }

    this.isLoading = true;

    try {
      // Atualizar dados no Firebase Auth
      await updateProfile(this.currentUser, {
        displayName: this.profile.nome
      });

      // Atualizar dados no Firestore
      await this.databaseService.updateUserProfile(
        this.currentUser.uid,
        this.currentUser.uid,
        {
          displayName: this.profile.nome,
          email: this.profile.email
        }
      );

      // Atualizar preferências
      await this.databaseService.updateUserPreferences(
        this.currentUser.uid,
        this.currentUser.uid,
        {
          notifications: this.security.notifications
        }
      );

      console.log('Perfil atualizado com sucesso');
      // Aqui você pode adicionar um toast de sucesso
      
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      // Aqui você pode adicionar um toast de erro
    } finally {
      this.isLoading = false;
    }
  }

  async alterarSenha() {
    if (!this.currentUser) {
      console.error('Usuário não autenticado');
      return;
    }

    if (this.passwordChange.newPassword !== this.passwordChange.confirmPassword) {
      console.error('As senhas não coincidem');
      return;
    }

    if (this.passwordChange.newPassword.length < 6) {
      console.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    this.isLoading = true;

    try {
      await updatePassword(this.currentUser, this.passwordChange.newPassword);
      
      // Limpar campos
      this.passwordChange = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };

      console.log('Senha alterada com sucesso');
      // Aqui você pode adicionar um toast de sucesso
      
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      // Aqui você pode adicionar um toast de erro
    } finally {
      this.isLoading = false;
    }
  }

  async exportarDados() {
    if (!this.currentUser) {
      console.error('Usuário não autenticado');
      return;
    }

    try {
      // Aqui você implementaria a lógica para exportar todos os dados do usuário
      // Por exemplo, gerar um JSON com todas as transações, contas, etc.
      console.log('Exportando dados do usuário...');
      
      // Implementação futura: gerar arquivo ZIP com todos os dados
      
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
    }
  }

  async excluirConta() {
    if (!this.currentUser) {
      console.error('Usuário não autenticado');
      return;
    }

    // Aqui você deveria mostrar um modal de confirmação
    const confirmDelete = confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');
    
    if (confirmDelete) {
      try {
        // Implementação futura: excluir todos os dados do usuário no Firestore
        // e depois excluir a conta do Firebase Auth
        console.log('Excluindo conta...');
        
        // await this.currentUser.delete();
        // this.router.navigate(['/login']);
        
      } catch (error) {
        console.error('Erro ao excluir conta:', error);
      }
    }
  }

}
