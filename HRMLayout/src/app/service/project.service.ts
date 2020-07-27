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
    this.httpClient.get("project/list").subscribe(
      (res:any) => this.projectsSubject.next(res)
    )
  }
  search(object:any){
    this.httpClient.post("project/search",object).subscribe(
      (res:any) =>{
        this.projectsSubject.next(res)
      }
    )
  }
  findById(id:any){
   return this.httpClient.get("project/find/"+id)
  }
  isDelete(id:number){
    this.httpClient.delete("project/isDelete/"+id).subscribe(
      (res:any) => {
        const { value } = this.projectsSubject
        const newList = value.filter(e => e.id != id)
        this.projectsSubject.next(newList)
      }
    )
  }
  newProject(project:Project){
   
   return this.httpClient.post("project/new",project)
    // .subscribe(
    //   (res:any) =>{
    //     const newList = [res,...this.projectsSubject.value]
    //     this.projectsSubject.next(newList)
    //   }
    // )
  }

  update(project:Project){
   return this.httpClient.put("project/update",project)
  }
}
