import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusProjectComponent } from './status-project.component';
import { RouterModule, Routes } from '@angular/router';
import { NzFormModule, NzSelectModule, NzInputModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';

const ROUTES:Routes=[
  {
    path:'',
    component:StatusProjectComponent
  }
]

@NgModule({
  declarations: [StatusProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule
  ]
})
export class StatusProjectModule { }
