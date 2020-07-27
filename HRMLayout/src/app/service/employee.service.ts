import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeesSubject = new BehaviorSubject<Employee[]>([]);

  preventiveSubject = new BehaviorSubject<Employee[]>([]);
  get preventive$() {
    return this.preventiveSubject.asObservable()
  }
  get employee$() {
    return this.employeesSubject.asObservable()
  }

  constructor(private httpClient: HttpClient) { }

  getList() {
    this.httpClient.get("employee/list").subscribe(
      (res: any) => this.employeesSubject.next(res)
    )
  }
  getListEmployeeFollowToProject(id: any) {
    this.httpClient.get("employee/inProject/" + id).subscribe(
      (res: any) => {
        console.log(res)
        this.employeesSubject.next(res)
      }
    )
  }
  getListEmployeeOutsideProject(id: any) {
    this.httpClient.get("employee/outsideProject/" + id).subscribe(
      (res: any) => {
        this.preventiveSubject.next(res)
      }
    )
  }
  moveEmployeeFromProject(project_id: any, employee_id: any) {
    this.httpClient.delete("employee/moveEmployee/" + project_id + "/" + employee_id).subscribe(
      (res: any) => {
        const { value } = this.employeesSubject

        const newList = value.filter((e: any) => e.id != employee_id)

        this.employeesSubject.next(newList)
      }
    )
  }
  addEmployeeIntoProject(project_id: any, employee: Employee[], role_id: any) {
    this.httpClient.post("employee/addEmployee/" + project_id + "/" + role_id, employee).subscribe(
      (res: any) => {
        console.log(res)
        res.map(
          e => {
            const newList = [e, ...this.employeesSubject.value];
            this.employeesSubject.next(newList);
          }
        )
      }
    )
  }
  addListEmployeeIntoProject(project_id: any, employee: Employee[]) {
    this.httpClient.post("employee/addListEmployee/" + project_id , employee)
    // .subscribe(
    //   (res: any) => {
    //     console.log(res)
    //     res.map(
    //       e => {
    //         const newList = [e, ...this.employeesSubject.value];
    //         this.employeesSubject.next(newList);
    //       }
    //     )
    //   }
    // )
  }
}
