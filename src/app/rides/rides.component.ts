import { Component, OnInit } from '@angular/core';
import { RideService } from './ride.service';
import { UserService } from '../auth/user.service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {

  constructor(private US : UserService, private router: Router, private AppComponent : AppComponent,private RS:RideService) { }


  ngOnInit() {
    if(this.AppComponent.loggedIn == false){
      this.router.navigate(['/']);
    }
  }


}
