import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'poke-list',
    loadComponent: () => import('./pages/poke-list/poke-list.component'),
  },
  {
    path: 'poke-details/:name',
    loadComponent: () => import('./pages/poke-details/poke-details.component'),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/errors/not-found/not-found.component'),
  },
  {
    path: 'error',
    loadComponent: () => import('./pages/errors/error/error.component'),
  },
  { path: '', redirectTo: 'poke-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];
