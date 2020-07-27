import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NzTableModule, NzIconModule, NzDividerModule, NzGridModule, NzCardModule, NzModalModule, NzFormModule, NzPopconfirmModule, NzInputModule, NzButtonModule, NzCheckboxModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LevelProjectComponent } from './level-project.component';

const ROUTES:Routes=[
  {
    path:'',
    component:LevelProjectComponent
  }
]

@NgModule({
  declarations: [LevelProjectComponent],
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
    FormsModule,
    NzButtonModule,
    NzCheckboxModule
  ]
})
export class LevelProjectModule { }
