import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadComponent: () => import('./paginas/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./paginas/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'recuperar-senha',
    loadComponent: () => import('./paginas/recuperar-senha/recuperar-senha.page').then( m => m.RecuperarSenhaPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./paginas/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./paginas/dashboard/dashboard.page').then( m => m.DashboardPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'metas',
    loadComponent: () => import('./paginas/metas/metas.page').then( m => m.MetasPage)
  },
  {
    path: 'transacoes',
    loadComponent: () => import('./paginas/transacoes/transacoes.page').then( m => m.TransacoesPage)
  },
  {
    path: 'relatorio',
    loadComponent: () => import('./paginas/relatorio/relatorio.page').then( m => m.RelatorioPage)
  },
  {
    path: 'configuracoes-conta',
    loadComponent: () => import('./paginas/configuracoes-conta/configuracoes-conta.page').then( m => m.ConfiguracaoContaPage)
  },
  {
    path: 'configuracoes-app',
    loadComponent: () => import('./paginas/configuracoes-app/configuracoes-app.page').then( m => m.ConfiguracoesAppPage)
  },
  {
    path: 'ajuda-suporte',
    loadComponent: () => import('./paginas/ajuda-suporte/ajuda-suporte.page').then( m => m.AjudaSuportePage)
  },
  {
    path: 'configuracoes-conta',
    loadComponent: () => import('./paginas/configuracoes-conta/configuracoes-conta.page').then( m => m.ConfiguracaoContaPage)
  },
  {
    path: 'configuracoes-app',
    loadComponent: () => import('./paginas/configuracoes-app/configuracoes-app.page').then( m => m.ConfiguracoesAppPage)
  },
  {
    path: 'ajuda-suporte',
    loadComponent: () => import('./paginas/ajuda-suporte/ajuda-suporte.page').then( m => m.AjudaSuportePage)
  },

];
