import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { Routes, RouterModule } from '@angular/router';
import { NzCollapseModule, NzTableModule, NzCheckboxModule, NzIconModule, NzDividerModule, NzInputModule, NzSelectModule, NzButtonModule, NzModalModule, NzStepsModule, NzFormModule, NzPopconfirmModule } from 'ng-zorro-antd';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const ROUTES:Routes=[
  {
    path:'',
    component:ProjectsComponent
  }
]

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NzCollapseModule,
    NzTableModule,
    NzCheckboxModule,
    IconsProviderModule,
    NzIconModule,
    NzDividerModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    FormsModule ,
    NzModalModule,
    NzStepsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzPopconfirmModule
  ]
})
export class ProjectsModule { }
