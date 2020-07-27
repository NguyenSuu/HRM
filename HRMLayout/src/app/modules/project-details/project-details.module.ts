import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { Routes, RouterModule } from '@angular/router';
import { NzTabsModule, NzLayoutModule, NzGridModule, NzCardModule, NzFormModule, NzSelectModule, NzInputModule, NzDatePickerModule, NzTableModule, NzDividerModule, NzCollapseModule, NzButtonModule, NzCheckboxModule, NzBreadCrumbModule, NzIconModule } from 'ng-zorro-antd';
import { OverViewComponent } from './component/over-view/over-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MemberComponent } from './component/member/member.component';
import { PlanComponent } from './component/plan/plan.component';
const ROUTES:Routes=[
  {
    path:'',
    component:ProjectDetailsComponent
  }
]

@NgModule({
  declarations: [ProjectDetailsComponent, OverViewComponent, MemberComponent, PlanComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NzTabsModule,
    NzLayoutModule,
    NzGridModule,
    NzCardModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    NzDatePickerModule,
    NgxChartsModule,
    NzTableModule,
    NzDividerModule,
    NzCollapseModule,
    FormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzBreadCrumbModule,
    NzIconModule
  ]
})
export class ProjectDetailsModule { }
