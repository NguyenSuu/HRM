import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'infomation',
        loadChildren: () => import('./modules/infomation/infomation.module').then(m => m.InfomationModule)
      },
      {
        path: 'employees',
        loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule)
      },
      {
        path: 'master',
        loadChildren: () => import('./modules/master/master.module').then(m => m.MasterModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'vacations',
        loadChildren: () => import('./modules/vacations/vacations.module').then(m => m.VacationsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
