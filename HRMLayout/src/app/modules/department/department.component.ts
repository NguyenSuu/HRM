import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/service/department.service';
import { Department } from 'src/app/models';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  listOfData: Department[]=[];

// Tiềm service của cơmponent vào contructor
  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.departmentService.getList();
    this.departmentService.department$.subscribe(l => this.listOfData=l)
  }

}
