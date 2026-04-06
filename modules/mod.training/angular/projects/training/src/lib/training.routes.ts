import { RouterOutletComponent } from '@abp/ng.core';
import { Routes } from '@angular/router';
import { FRUIT_ROUTES } from './fruits/fruit/fruit-routes';

export const TRAINING_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RouterOutletComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/training.component').then(c => c.TrainingComponent),
      },
    ],
  },
  { path: 'fruits', children: FRUIT_ROUTES },
];
