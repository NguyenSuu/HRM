import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { Routes, RouterModule } from '@angular/router';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule, NzCheckboxModule, NzIconModule, NzDividerModule } from 'ng-zorro-antd';
import { IconsProviderModule } from 'src/app/icons-provider.module';

const ROUTES:Routes=[
  {
    path:'',
    component:EmployeesComponent
  }
]

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NzCollapseModule,
    NzTableModule,
    NzCheckboxModule,
    IconsProviderModule,
    NzIconModule,
    NzDividerModule
  ]
})
export class EmployeesModule { }
