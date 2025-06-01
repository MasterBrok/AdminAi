import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add/add-user.component';
import { EditUserComponent } from './users/edit/edit-user.component';
import { authGuard } from './guards/auth.guard';
import { PlayersComponent } from './players/players.component';
import { EditPlayerComponent } from './players/edit/edit-player.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: AddUserComponent },
      { path: 'users/edit', component: EditUserComponent },
      { path: 'settings', redirectTo: 'overview' },
      { path: 'reports', redirectTo: 'overview' },
      { path: 'players', component: PlayersComponent },
      { path: 'players/edit', component: EditPlayerComponent },
      { path: 'genders', loadComponent: () => import('./genders/genders.component').then(m => m.GendersComponent) },
      { path: 'genders/add', loadComponent: () => import('./genders/add/add-gender.component').then(m => m.AddGenderComponent) },
      { path: 'genders/edit', loadComponent: () => import('./genders/edit/edit-gender.component').then(m => m.EditGenderComponent) }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];