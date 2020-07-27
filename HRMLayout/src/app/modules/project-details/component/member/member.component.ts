import { Component, OnInit, Input } from '@angular/core';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { RoleService } from 'src/app/service/role.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  panels = [
    {
      active: false,
      disabled: true,
      name: 'Add member',
      icon: 'double-right',
      customStyle: {
        background: '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        border: '0px'
      }
    }
  ];
  department_id: any = null;
  role_id:any=null;
  default: any = "-";
  list_employee :Employee[] =[];
  employee: Employee ={
    id:null
  }
  @Input() setting: "view" | "edit" | "create";
  constructor(
    public departmentService: DepartmentService,
    public employeeService: EmployeeService,
    public roleService:RoleService,
    private route: ActivatedRoute,
    private modal: NzModalService,

  ) { }

  add() {
    this.list_employee.push(this.employee);
    this.employeeService.addEmployeeIntoProject(this.id_project,this.list_employee,this.role_id);
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.department_id=null;
    this.employee=null;
    this.role_id =null;
  }
  id_project: string = this.route.snapshot.params.id;
  
  ngOnInit(): void {
    this.departmentService.getList();
    this.roleService.getList();
    this.employeeService.getListEmployeeOutsideProject(this.id_project);
    this.employeeService.getListEmployeeFollowToProject(this.id_project);
    this.employeeService.employee$.subscribe(l => {
      this.listOfData = l
    })
  }
  //-----------------Table--------------//

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: Employee[] = [];
  listOfData: Employee[] = [];
  setOfCheckedId = new Set<number>();
  confirmModal?: NzModalRef;
  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'Clicked the OK button',
      nzOnOk: () => {
        this.setOfCheckedId.forEach((item: any) => {
          this.employeeService.moveEmployeeFromProject(this.id_project, item)
        })
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
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: Employee[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
}
