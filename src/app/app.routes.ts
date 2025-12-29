import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/introduction').then((m) => m.IntroductionComponent),
  },
];
