import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard], data: {expectedRol: ['admin', 'user']}
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/client/client.module').then(m => m.ClientModule),
    canActivate: [AuthGuard], data: {expectedRol: ['admin', 'user']}
  },
  {
    path: '',
    loadChildren: () => import('./pages/default/default.module').then(m => m.DefaultModule)
    //,canActivate: [AuthGuard], data: {expectedRol: ['admin', 'user']}
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
