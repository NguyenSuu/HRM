import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LevelProject, StatusProject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  levelProjectsSubject = new BehaviorSubject<LevelProject[]>([]);
  statusProjectsSubject = new BehaviorSubject<StatusProject[]>([]);
  get levelProjects$() {
    return this.levelProjectsSubject.asObservable()
  }
  get statusProjects$() {
    return this.statusProjectsSubject.asObservable()
  }
  constructor(private httpClient: HttpClient) { }
  // Level Project
  getListLevelProject() {
    this.httpClient.get("levelProject").subscribe(
      (res: any) => {
        this.levelProjectsSubject.next(res)
      }
    )
  }
  addLevelProject(level: LevelProject[]) {
    for(const l in level){
      console.log(l)
    }
    console.log("leveeee",level);
    this.httpClient.post("newLevelProject", level).subscribe(
      (res: any) => {
        const newList = [res, ...this.levelProjectsSubject.value]
        this.levelProjectsSubject.next(newList);
      }
    )
  }
  isDelete(id: string) {
    this.httpClient.delete("isDeleteLevelProject/" + id).subscribe(
      (res: any) => {
        const { value } = this.levelProjectsSubject

        const newList = value.filter((e: any) => e.id != id)

        this.levelProjectsSubject.next(newList)
      }
    )
  }
  // Status Project
  getListStatusProject() {
    this.httpClient.get("statusProject").subscribe(
      (res: any) => this.statusProjectsSubject.next(res)
    )
  }
}
