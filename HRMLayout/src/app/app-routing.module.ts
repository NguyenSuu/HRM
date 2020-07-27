import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthModule } from './pages/auth/auth.module';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: WelcomeComponent,
    canActivate: [AuthService],
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
      },
      {
        path: 'projects',
        loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'department',
        loadChildren: () => import('./modules/department/department.module').then(m => m.DepartmentModule)
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
        path: 'level-project',
        loadChildren: () => import('./modules/master/level-project/level-project.module').then(m => m.LevelProjectModule)
      },
      {
        path: 'status-project',
        loadChildren: () => import('./modules/master/status-project/status-project.module').then(m => m.StatusProjectModule)
      },
      
      {
        path: 'reports',
        loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'vacations',
        loadChildren: () => import('./modules/vacations/vacations.module').then(m => m.VacationsModule)
      },
      {
        path: 'project-details/:id',
        loadChildren: () => import('./modules/project-details/project-details.module').then(m => m.ProjectDetailsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
