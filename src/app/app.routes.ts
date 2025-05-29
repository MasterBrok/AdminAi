import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add/add-user.component';
import { EditUserComponent } from './users/edit/edit-user.component';
import { authGuard } from './guards/auth.guard';

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
      { path: 'reports', redirectTo: 'overview' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];