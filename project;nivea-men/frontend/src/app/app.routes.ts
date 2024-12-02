import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { LayoutComponent } from './pages/login/layout/layout.component';
import { DashboardComponent } from './pages/login/dashboard/dashboard.component';

export const routes: Routes = [
    {
      path:  '', redirectTo: 'login', pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'dashboard',
          component: DashboardComponent,
          children: [
            {
              path: 'dashboard',
              component: DashboardComponent
            }
          ]
        }
      ]
    }
  ];
