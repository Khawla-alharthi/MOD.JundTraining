import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const VEG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/veg.component').then(c => c.VegComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
