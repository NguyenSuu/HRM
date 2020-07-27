import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  rolesSubject=new BehaviorSubject<Role[]>([]);
  get roles$(){
   return this.rolesSubject.asObservable();
  }
  constructor(private http:HttpClient) { }

  getList(){
    this.http.get("role/list").subscribe(
      (res:any) => {
        this.rolesSubject.next(res)
      }
    )
  }
}
