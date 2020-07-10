import { Component, OnInit } from '@angular/core';
import { LevelProject, StatusProject } from 'src/app/models/static';
import { MasterService } from 'src/app/service/master.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  LevelDataProject: LevelProject[] = [];
  constructor(private masterService: MasterService, private fb: FormBuilder) { }
  isVisible = false;
  validateForm: FormGroup;
  LevelProject: LevelProject ;
  listOfControl: Array<{ id: number; name: any}> = [];
  deleteRow(id: string): void {
    this.masterService.isDelete(id);
  }
  ///////////////////////
  editCache: { [key: string]: { edit: boolean, data: LevelProject } } = {};
  startEdit(id: string): void {
    
    this.editCache[id].edit = true;
  }
  cancelEdit(id: string): void {
    const index = this.LevelDataProject.findIndex((item: any) => item.id === id);
    this.editCache[id] = {
      data: { ...this.LevelDataProject[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.LevelDataProject.findIndex((item: any) => item.id === id);
    Object.assign(this.LevelDataProject[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.LevelDataProject.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.addField();
    this.masterService.getListLevelProject();
    this.masterService.levelProjects$.subscribe(l => {
      this.LevelDataProject = l
      console.log(l)
      this.updateEditCache();
    });
  }
  ///////////////////////
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      name,
    };

    console.log(this.listOfControl)
    for(let i=0;i<this.listOfControl.length;i++){
        console.log(this.listOfControl[i].name)
    }
    const index = this.listOfControl.push(control);
    // console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(this.listOfControl[index - 1].name, new FormControl(null, Validators.required));
  }

  removeField(i: { id: number; name: any}, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl); 
      this.validateForm.removeControl(i.name);
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const level = this.validateForm.value;
    
    console.log("level: ",this.validateForm.value);
    this.masterService.addLevelProject(level);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
