import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: '',
    loadComponent: () => import('./paginas/inicio/inicio.page').then( m => m.InicioPage)
  },
];
