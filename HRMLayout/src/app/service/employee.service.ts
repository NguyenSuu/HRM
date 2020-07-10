import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeesSubject = new BehaviorSubject<Employee[]>([]);

  get employee$(){
    return this.employeesSubject.asObservable()
  }

  constructor(private httpClient:HttpClient) { }

  getList(){
    this.httpClient.get("employee").subscribe(
      (res:any) => this.employeesSubject.next(res)
    )
  }
}
