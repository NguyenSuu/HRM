import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { Routes, RouterModule } from '@angular/router';

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
    RouterModule.forChild(ROUTES)
  ]
})
export class EmployeesModule { }
