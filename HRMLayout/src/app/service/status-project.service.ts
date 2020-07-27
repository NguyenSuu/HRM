import { Injectable } from '@angular/core';
import { StatusProject } from '../models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusProjectService {

  statusProjectsSubject = new BehaviorSubject<StatusProject[]>([]);

  get statusProjects$() {
    return this.statusProjectsSubject.asObservable()
  }
  
  constructor(private httpClient: HttpClient) {
   }
  getList() {
    this.httpClient.get("status/list").subscribe(
      (res: any) => {
        this.statusProjectsSubject.next(res)
      }
    )
  }
  add(status: StatusProject[]) {
    this.httpClient.post("status/new", status).subscribe(
      (res: any) => {
        const newList = [res, ...this.statusProjectsSubject.value]
        this.statusProjectsSubject.next(newList);
      }
    )
  }
  isDelete(id: string) {
    this.httpClient.delete("status/isDelete/" + id).subscribe(
      (res: any) => {
        const { value } = this.statusProjectsSubject

        const newList = value.filter((e: any) => e.id != id)

        this.statusProjectsSubject.next(newList)
      }
    )
  }
}
