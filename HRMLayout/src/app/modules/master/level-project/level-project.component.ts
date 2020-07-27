import { Component, OnInit } from '@angular/core';
import { LevelProject } from 'src/app/models/static';
import { LevelProjectService } from 'src/app/service/level-project.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';


@Component({
  selector: 'app-level-project',
  templateUrl: './level-project.component.html',
  styleUrls: ['./level-project.component.scss']
})
export class LevelProjectComponent implements OnInit {
  LevelDataProject: LevelProject[] = [];
  constructor(private levelProjectService: LevelProjectService, private fb: FormBuilder,private modal: NzModalService) { }
  isVisible = false;
  editRecord = false;
  validateForm: FormGroup;
  LevelProject: LevelProject;
  // deleteRow(id: string): void {
  //   this.levelProjectService.isDelete(id);
  // }
  //-----------------------siDelete------------------//
  confirmModal?: NzModalRef;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'Clicked the OK button',
      nzOnOk: () => {
        this.setOfCheckedId.forEach(item =>
          this.levelProjectService.isDelete(item)
          )
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
      }
    });

  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    console.log("ProjectsComponent -> onItemChecked -> id", id)
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.LevelDataProject.forEach(item => this.updateCheckedSet(item.id, value));
    console.log("ProjectsComponent -> onAllChecked -> value", value)
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: LevelProject[]): void {
    this.LevelDataProject = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.LevelDataProject.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.LevelDataProject.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  //---------------------------------------Edit--------------------------------//
  editCache: { [key: string]: { edit: boolean, data: LevelProject } } = {};
  startEdit(id: number): void {

    this.editCache[id].edit = true;

    this.editRecord = true;

  }
  cancelEdit(id: string): void {
    const index = this.LevelDataProject.findIndex((item: any) => item.id === id);
    this.editCache[id] = {
      data: { ...this.LevelDataProject[index] },
      edit: false
    };
    this.editRecord=false;
  }

  saveEdit(id: string): void {
    const index = this.LevelDataProject.findIndex((item: any) => item.id === id);
    Object.assign(this.LevelDataProject[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    this.editRecord=false;
  }

  updateEditCache(): void {
    this.LevelDataProject.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
 
  //-----------------------------Create---------------------------//

  removeField(i:any) {
    console.log(i)
    this.levelControl.removeAt(i)
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if(this.isFormInvalid){
        return
    }
    
    const {level} = this.validateForm.value;
    console.log("level: ", this.validateForm.value);
    
    this.levelProjectService.add(level);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  get levelControl() {
    return this.validateForm.controls.level as FormArray;
  }
  addLevel() {
    this.levelControl.push(
      this.fb.group({
        name: ['',[Validators.required]],
      })
      );
  }
  get isFormInvalid(){
    const levelControls=this.validateForm.get('level') as FormArray

    let isInValid = levelControls.invalid
    
    return isInValid
  }
  //---------------------------------------------------------------->
 
  ngOnInit() {
    this.validateForm = this.fb.group({
      level: this.fb.array([])
    });
    this.addLevel()
    // this.addField();
    this.levelProjectService.getList();
    this.levelProjectService.levelProjects$.subscribe(l => {
      this.LevelDataProject = l
      this.updateEditCache();
    });
  }
}
