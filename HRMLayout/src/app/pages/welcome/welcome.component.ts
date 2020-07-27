import { Component, OnInit } from '@angular/core';
import { RoutesInfo, ROUTESINFO, ROUTESMASTER } from '../constant';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  routerList:RoutesInfo[]= ROUTESINFO;
  routerMaster:RoutesInfo[]= ROUTESMASTER;
  isCollapsed = false;
  constructor(private route:ActivatedRoute,private authService:AuthService) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams)
  }
  signOut(){
    this.authService.signOut();
  }

}
