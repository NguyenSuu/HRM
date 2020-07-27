import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Project, Department, Employee } from 'src/app/models';
import { LevelProjectService } from 'src/app/service/level-project.service';
import { StatusProjectService } from 'src/app/service/status-project.service';
import { DepartmentService } from 'src/app/service/department.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { RoleService } from 'src/app/service/role.service';
import { TechnologyService } from 'src/app/service/technology.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  listOfCurrentPageDataProject: Project[] = [];
  listOfData: Project[] = [];
  listOfCurrentPageDataEmployee: Employee[] = [];
  preventiveData: Employee[] = [];
  //--------------------Create---------------------//
  isVisible = false;


  showModal(): void { //--Hiển thị modal
    this.isVisible = true;
    this.employeeService.getList();
    this.roleService.getList();
  }

  handleOk(): void { //--Submit modal
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void { //--Cancel modal
    console.log('Button cancel clicked!');
    this.isVisible = false;

  }

  current = 0;
  index = '1';
  // get isFormInvaid(){
  //   const projectsControl=this.validateForm.get('projects') as FormArray
  //   let isInValid = projectsControl.invalid
  //   return isInValid
  // }
  // get projectsControl() {
  //   return this.validateForm.controls.projects as FormArray;
  // }
  errors: any = null;
  // get codeErrors() {
  //   return this.validateForm.get('code').errors
  // }
  // get nameErrors() {
  //   return this.validateForm.get('name').errors
  // }
  // get levelErrors() {
  //   return this.validateForm.get('level').errors
  // }
  // get statusErrors() {
  //   return this.validateForm.get('status').errors
  // }
  // get startDateErrors() {
  //   return this.validateForm.get('expected_start_date').errors
  // }
  // get endDateErrors() {
  //   return this.validateForm.get('expected_end_date').errors
  // }

  pre(): void { //--Lui lại step trước đó
    this.current -= 1;
    this.changeContent();
  }

  next(): void { //--Next step
    // this.errors = {
    //   code: { ...this.codeErrors },
    //   name: { ...this.nameErrors },
    //   level: { ...this.levelErrors },
    //   status: { ...this.statusErrors },
    //   // startDate: {...this.startDateErrors},
    //   // endDate: {...this.endDateErrors},
    // }
    console.log("ProjectsComponent -> next -> this.validateForm", this.validateForm)

    if (this.validateForm.invalid) {

      return
    }
    this.current += 1;
    this.changeContent();
  }
  projectJustAdd: Project;
  async newProject():Promise<any> {
    const project = this.validateForm.value;
    console.log("ProjectsComponent -> project", project)
    const newProject = project.map(
      e =>{
        return {
          ...e,
          employee:this.preventiveData
        }
      }
    )
    console.log("newProject",newProject)
    // await this.projectService.newProject(this.validateForm.value).toPromise().then(
    //   (res: any) => {
    //     console.log(res)
    //     this.projectJustAdd = res;
    //     this.listOfData = [res, ...this.listOfData]
    //   }
    // )
  }
  // async addMember(){
  //   await this.employeeService.
  // }
  done(): void { //--Kết thúc
    this.newProject();
    // console.log(this.projectJustAdd)
    // this.employeeService.addListEmployeeIntoProject(this.projectJustAdd.id,this.preventiveData)
  }

  changeContent(): void { //--Thay đổi hiển thị của các step
    switch (this.current) {
      case 0: {
        this.index = '1';
        break;
      }
      case 1: {
        this.index = '2';
        break;
      }
      case 2: {
        this.index = '3';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
  employee: Employee = null;
  role: any = null;

  add() {
    this.employee.preventive_role = this.role;
    this.preventiveData.push(this.employee)
    this.preventiveData = [...this.preventiveData]
  }
  deleteRow(id: any) {
    for (let i = 0; i < this.preventiveData.length; ++i) {
      if (this.preventiveData[i].id === id) {
        this.preventiveData.splice(i, 1);
      }
    }
    this.preventiveData = [...this.preventiveData]
  }
  //----------------------Search---------------------//

  panels = [
    {
      active: false,
      disabled: true,
      name: 'Sreach',
      icon: 'double-right',
      customStyle: {
        background: '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        border: '0px'
      }
    }
  ];
  default: any = "-";
  level_id: any = null;
  status_id: any = null;
  department_id: any = null;
  code_project: any = null;
  name_project: any = null;
  technology_id: any = null;
  object: Project = {
    code: null,
    name: null,
    technology: {
      id: null
    },
    department: {
      id: null,
    },
    level: {
      id: null
    },
    status: {
      id: null
    }
  };

  constructor(private projectService: ProjectService, public levelService: LevelProjectService,
    public statusService: StatusProjectService, public departmentService: DepartmentService,
    private modal: NzModalService, private fb: FormBuilder,
    public employeeService: EmployeeService, public technologyService: TechnologyService,
    public roleService: RoleService,
  ) { }
  search() {
    this.object.department.id = this.department_id;
    this.object.status.id = this.status_id;
    this.object.level.id = this.level_id;
    this.object.code = this.code_project;
    this.object.name = this.name_project;
    this.object.technology.id = this.technology_id;
    this.projectService.search(this.object);
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.level_id = null;
    this.status_id = null;
    this.department_id = null;
    this.code_project = null;
    this.name_project = null;
    this.technology_id = null;
  }
  onChange(result: Date): void {
  }
  //------------------------------------------------->

  //-----------------------siDelete------------------//
  confirmModal?: NzModalRef;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'Clicked the OK button',
      nzOnOk: () => {
        this.setOfCheckedId.forEach(item =>
          this.projectService.isDelete(item)
        )
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
      }
    });
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    console.log("ProjectsComponent -> onItemChecked -> id", id)
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageDataProject.forEach(item => this.updateCheckedSet(item.id, value));
    console.log("ProjectsComponent -> onAllChecked -> value", value)
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: Project[]): void {
    this.listOfCurrentPageDataProject = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageDataProject.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageDataProject.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  //-------------------------------------------------->

  ngOnInit(): void {
    this.technologyService.getList()
    this.departmentService.getList()
    this.levelService.getList()
    this.statusService.getList()
    this.projectService.getList()
    this.projectService.projects$.subscribe(l => this.listOfData = l)
    this.validateForm = this.fb.group({
      status: ['', [Validators.required]],
      level: ['', [Validators.required]],
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      department: ['', [Validators.required]],
      employee:[''],
      notes: ['',],
    });

  }

}
