import { Component } from '@angular/core';
import { UserService } from '../app/auth/user.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { NotificationService } from './notifications/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'singipool-app';
  private numberBadge:number = 0;

  hiddenBadge=false;
  loggedIn : boolean = false;
  route: string;

  constructor(private US : UserService, location: Location, private router : Router, private NS:NotificationService) {
    router.events.subscribe((val) => {  
        this.route = 'SingidunumCarpooling'
    });
    this.setNumBadge();
    
  }
  
 
setNumBadge(){
  if (this.loggedIn){
    console.log(this.US.getCurrentUser().typeOfUser)
    if (this.US.getCurrentUser().typeOfUser == 'Prevoznik'){
      this.hiddenBadge = false;
      this.numberBadge = 
          this.NS.getReceivedRequestsFalse_number(this.US.getCurrentUser().id) +
          this.NS.getReceivedRequestsTrue_number(this.US.getCurrentUser().id);
    }
    if (this.US.getCurrentUser().typeOfUser == 'Putnik'){
      this.hiddenBadge = false;
      this.numberBadge = 
            this.NS.getSentRequestsFalse_number(this.US.getCurrentUser().id) + 
            this.NS.getSentRequestsTrue_number(this.US.getCurrentUser().id);
    }
    if (this.numberBadge == 0 ){
      console.log("hereare 0")
      this.hiddenBadge = true;
    }
  }

}
  
  setLoggedIn( value : boolean){
    this.loggedIn = value;
    this.setNumBadge();
  }

  signOut(){
    this.loggedIn = false;
  
  }

  myProfile(){
    this.US.profileToShow = this.US.loggedInUser.id;
  }



}