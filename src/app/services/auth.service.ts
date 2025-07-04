import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user, User, updateProfile, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User | null>;

  constructor(private auth: Auth, private databaseService: DatabaseService) {
    this.user$ = user(this.auth);
  }

  // Login with email and password
  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Register new user
  async register(email: string, password: string, displayName?: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      
      // Atualizar perfil do usuário com o nome
      if (displayName && result.user) {
        await updateProfile(result.user, { displayName });
      }
      
      // Criar estrutura de banco de dados para o novo usuário
      if (result.user) {
        await this.databaseService.createUserDatabase(
          result.user.uid,
          result.user.email || email,
          displayName || result.user.displayName || 'Usuário'
        );
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Login with Google
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      
      // Verificar se é primeira vez do usuário e criar estrutura se necessário
      if (result.user) {
        try {
          await this.databaseService.createUserDatabase(
            result.user.uid,
            result.user.email || '',
            result.user.displayName || 'Usuário'
          );
        } catch (error) {
          // Se der erro, provavelmente o usuário já existe
          console.log('Usuário já existe no banco de dados');
        }
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  // Obter usuário atual (método síncrono)
  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = this.auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
  }

  // Obter UID do usuário atual
  getCurrentUserId(): string | null {
    return this.auth.currentUser?.uid || null;
  }

  // Get user observable
  getUser(): Observable<User | null> {
    return this.user$;
  }
}
