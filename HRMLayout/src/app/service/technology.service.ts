import { Injectable } from '@angular/core';
import { Technology } from '../models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  technologySubject=new BehaviorSubject<Technology[]>([]);
  get technology$(){
   return this.technologySubject.asObservable();
  }
  constructor(private http:HttpClient) { }

  getList(){
    this.http.get("technology/list").subscribe(
      (res:any) => {
        this.technologySubject.next(res)
      }
    )
  }
}
