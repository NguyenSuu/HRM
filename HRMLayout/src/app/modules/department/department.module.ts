import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { Routes, RouterModule } from '@angular/router';
import { NzIconModule, NzTableModule, NzDividerModule, NzButtonModule } from 'ng-zorro-antd';

const ROUTES:Routes=[
  {
    path:'',
    component:DepartmentComponent
  }
]

@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NzIconModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule
  ]
})
export class DepartmentModule { }
