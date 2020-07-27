import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LevelProject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LevelProjectService {
  levelProjectsSubject = new BehaviorSubject<LevelProject[]>([]);

  get levelProjects$() {
    return this.levelProjectsSubject.asObservable()
  }

  constructor(private httpClient: HttpClient) {
  }
  getList() {
    this.httpClient.get("level/list").subscribe(
      (res: any) => {
        this.levelProjectsSubject.next(res)
      }
    )
  }
  add(level: any) {
    this.httpClient.post("level/new", level).subscribe(
      (res: any) => {
        res.map(
          e => {
            const newList = [e, ...this.levelProjectsSubject.value]
            this.levelProjectsSubject.next(newList);
          }
        )
      }
    )
  }
  isDelete(id: any) {
    this.httpClient.delete("level/isDelete/" + id).subscribe(
      (res: any) => {
        const { value } = this.levelProjectsSubject

        const newList = value.filter((e: any) => e.id != id)

        this.levelProjectsSubject.next(newList)
      }
    )
  }
}
