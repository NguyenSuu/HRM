import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LevelProjectService } from 'src/app/service/level-project.service';
import { StatusProjectService } from 'src/app/service/status-project.service';
import { Project } from 'src/app/models';
import { ProjectService } from 'src/app/service/project.service';
import { Router, ActivatedRoute } from '@angular/router';
export var multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "2010",
        "value": 5000002
      },
      {
        "name": "2011",
        "value": 5800000
      }
    ]
  }
];
@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.scss']
})
export class OverViewComponent implements OnInit {

  validateForm!: FormGroup;
  history: any[];
  date = null;
  dateRange = [];
  multi: any[];
  view: any[] = [500, 300];
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }


  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder, public levelService: LevelProjectService,
    public statusService: StatusProjectService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {
    Object.assign(this, { multi });
  }

  //<------------Charts---------------->//

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  //---------------------------------------------------->
  //------------------------Edit-----------------------//
  DataProject: Project;
  cloneData:Project;
  isVisible = false;
  editRecord = false;
  LevelProject: Project;
  @Input() setting: "view" | "edit";
  update(){
    const project = this.validateForm.value
    console.log("update -> project", project)
    this.projectService.update(project).subscribe(
      (res:any) => {
        this.DataProject = res
      }
    )
  }
  cancel(){

  }
  //---------------------------------------------------->
  id: string = this.route.snapshot.params.id;

  ngOnInit(): void {
    this.levelService.getList();
    this.statusService.getList();
    console.log("id", this.id);
    this.projectService.findById(this.id).subscribe(
      (res: any) => {
        console.log("Project", res)
        this.DataProject = res
        this.cloneData = {...this.DataProject}
      });
    // this.projectService.projects$.subscribe(l =>this.DataProject = l);
    this.validateForm = this.fb.group({
      expected_end_date: ['', [Validators.required]],
      expected_start_date: ['', [Validators.required]],
      status: ['', [Validators.required]],
      level: ['', [Validators.required]],
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      notes: [''],
    });
  }
}
