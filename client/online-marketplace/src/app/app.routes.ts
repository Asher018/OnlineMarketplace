import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'marketplace', pathMatch: 'full' },
    { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
    { path: 'profile', loadComponent: () => import('./profile/profile.component').then((c) => c.ProfileComponent), canActivate: [authGuard] },
    { path: 'marketplace', loadComponent: () => import('./marketplace/marketplace.component').then((c) => c.MarketplaceComponent) },
    { path: '**', redirectTo: 'marketplace' }
];
