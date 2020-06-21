import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { Routes, RouterModule } from '@angular/router';

const ROUTES:Routes=[
  {
    path:'',
    component:MasterComponent
  }
]

@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MasterModule { }
