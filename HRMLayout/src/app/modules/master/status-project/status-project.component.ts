import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/service/project.service';
import { StatusProjectService } from 'src/app/service/status-project.service';
import { LevelProjectService } from 'src/app/service/level-project.service';
import { DepartmentService } from 'src/app/service/department.service';
import { NzModalService } from 'ng-zorro-antd';
import { EmployeeService } from 'src/app/service/employee.service';
import { RoleService } from 'src/app/service/role.service';
import { TechnologyService } from 'src/app/service/technology.service';

@Component({
  selector: 'app-status-project',
  templateUrl: './status-project.component.html',
  styleUrls: ['./status-project.component.scss']
})
export class StatusProjectComponent implements OnInit {
  validateForm!: FormGroup;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.projectService.newProject(this.validateForm.value)
  }
  constructor(private projectService: ProjectService, public levelService: LevelProjectService,
    public statusService: StatusProjectService, public departmentService: DepartmentService,
    private modal: NzModalService, private fb: FormBuilder,
    public employeeService: EmployeeService, public technologyService: TechnologyService,
    public roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.technologyService.getList()
    this.departmentService.getList()
    this.levelService.getList()
    this.statusService.getList()
    this.projectService.getList()
    this.validateForm = this.fb.group({
      // project: this.fb.group({
        status: ['', [Validators.required]],
        level: ['', [Validators.required]],
        code: ['', [Validators.required]],
        name: ['', [Validators.required]],
        notes: ['',],
      // })
    })
  }

}
