import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfomationComponent } from './infomation.component';
import { Routes, RouterModule } from '@angular/router';

const ROUTES:Routes=[
  {
    path:'',
    component:InfomationComponent
  }
]

@NgModule({
  declarations: [InfomationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class InfomationModule { }
