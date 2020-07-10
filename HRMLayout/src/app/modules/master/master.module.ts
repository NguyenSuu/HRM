import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { Routes, RouterModule } from '@angular/router';
import { NzTableModule, NzIconModule, NzDividerModule, NzGridModule, NzCardModule, NzModalModule, NzFormModule, NzPopconfirmModule, NzInputModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    NzTableModule,
    NzIconModule,
    NzDividerModule,
    NzGridModule,
    NzCardModule,
    NzModalModule,
    NzFormModule,
    NzPopconfirmModule,
    NzInputModule,
    FormsModule
  ]
})
export class MasterModule { }
