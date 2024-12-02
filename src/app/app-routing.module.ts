import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';  // Importe o AuthGuard

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]  // Protege esta rota com o AuthGuard
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'converter',
    loadChildren: () => import('./converter/converter.module').then(m => m.ConverterPageModule),
    canActivate: [AuthGuard]  // Protege esta rota com o AuthGuard
  },
  {
    path: 'multiple-conversion',
    loadChildren: () => import('./multiple-conversion/multiple-conversion.module').then(m => m.MultipleConversionPageModule),
    canActivate: [AuthGuard]  // Protege esta rota com o AuthGuard
  },
  {
    path: 'supported-currencies',
    loadChildren: () => import('./supported-currencies/supported-currencies.module').then(m => m.SupportedCurrenciesPageModule),
    canActivate: [AuthGuard]  // Protege esta rota com o AuthGuard
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then(m => m.HistoryPageModule),
    canActivate: [AuthGuard]  // Protege esta rota com o AuthGuard
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
