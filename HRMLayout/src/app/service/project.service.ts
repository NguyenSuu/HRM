import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../models/static';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectsSubject = new BehaviorSubject<Project[]>([]);

  get projects$(){
    return this.projectsSubject.asObservable();
  }
  constructor(private httpClient:HttpClient) { }

  getList(){
    this.httpClient.get("project").subscribe(
      (res:any) => this.projectsSubject.next(res)
    )
  }
}
