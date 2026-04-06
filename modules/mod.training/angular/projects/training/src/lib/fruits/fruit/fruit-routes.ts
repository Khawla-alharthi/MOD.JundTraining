import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const FRUIT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/fruit.component').then(c => c.FruitComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
