import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentsSubject = new BehaviorSubject<Department[]>([]);

  get department$() {
    return this.departmentsSubject.asObservable()
  }

  constructor(private httpClient: HttpClient) { }

  getList(){
    this.httpClient.get("department").subscribe(
      (res:any) => this.departmentsSubject.next(res)
    )
  }
}
