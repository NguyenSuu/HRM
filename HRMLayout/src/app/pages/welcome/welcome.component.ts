import { Component, OnInit } from '@angular/core';
import { RoutesInfo, ROUTESINFO } from '../constant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  routerList:RoutesInfo[]= ROUTESINFO;
  isCollapsed = false;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams)
  }

}
