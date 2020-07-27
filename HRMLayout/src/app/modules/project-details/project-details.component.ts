import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project:Project;
  setting = "view";
  

  constructor(private route:ActivatedRoute, private projectService:ProjectService) { }
  
  id:string = this.route.snapshot.params.id;
  
  ngOnInit(): void {
    this.projectService.findById(this.id).subscribe((res:any) => this.project=res)
  }
  change(){
    console.log("ProjectDetailsComponent -> change -> setting", this.setting)
  }
}
