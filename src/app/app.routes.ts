import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'poke-list',
    loadComponent: () => import('./pages/poke-list/poke-list.component'),
  },
  {
    path: 'poke-details/:id',
    loadComponent: () => import('./pages/poke-details/poke-details.component'),
  },
  { path: '**', redirectTo: 'poke-list' },
];
