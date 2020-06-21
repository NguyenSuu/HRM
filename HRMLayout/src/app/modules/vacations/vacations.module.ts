import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationsComponent } from './vacations.component';
import { Routes, RouterModule } from '@angular/router';

const ROUTES:Routes=[
  {
    path:'',
    component:VacationsComponent
  }
]

@NgModule({
  declarations: [VacationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class VacationsModule { }
