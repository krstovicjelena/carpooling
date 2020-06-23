import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/user.service';
import { Router } from "@angular/router";
import { AppComponent } from '../../app.component';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  private numPoslatiZahtevi = 10;
  private numPrimljeniZahtevi = 10;
  private numOdobreniZahtevi = 10;
  
  private hiddenBadgeArray = [false, false, false];


  constructor(private US : UserService, private router: Router, private AppComponent : AppComponent, private NS: NotificationService) { 
    let userID = this.US.getCurrentUser().id;
    let userTIP = this.US.getCurrentUser().typeOfUser;
    
    this.numPoslatiZahtevi = this.NS.getSentRequestsFalse_number(userID);

    this.numPrimljeniZahtevi = this.NS.getReceivedRequestsFalse_number(userID);

    if (userTIP == 'Prevoznik'){
      this.numOdobreniZahtevi = this.NS.getReceivedRequestsTrue_number(userID);;
    }
    if (userTIP == 'Putnik'){
      this.numOdobreniZahtevi = this.NS.getSentRequestsTrue_number(userID);;
    }


    if (this.numPoslatiZahtevi == 0){
      this.hiddenBadgeArray[0] = true
    }
    if (this.numPrimljeniZahtevi == 0){
      this.hiddenBadgeArray[1] = true
    }
    if (this.numOdobreniZahtevi == 0){
      this.hiddenBadgeArray[2] = true
    }

    if (userTIP == 'Putnik'){
      this.NS.setSeenByPassengerTrue('SentRequestsFalse' , this.US.getCurrentUser().id);
      this.AppComponent.setNumBadge();
    }
    if (userTIP == 'Prevoznik'){
      this.NS.setSeenByDriverTrue('ReceivedRequestsFalse' , this.US.getCurrentUser().id);
      this.AppComponent.setNumBadge();
    }
    

  }
  private selectedIndex = 0;

  ngOnInit() {
    if(this.AppComponent.loggedIn == false){
      this.router.navigate(['/']);
    }
  }

  onBadge(numberIN:number){
    this.hiddenBadgeArray[numberIN] = true;


    if (numberIN == 0){
      this.NS.setSeenByPassengerTrue('SentRequestsFalse' , this.US.getCurrentUser().id);
    }

    if (numberIN == 1){
      this.NS.setSeenByDriverTrue('ReceivedRequestsFalse' , this.US.getCurrentUser().id);
    }

    if (numberIN == 2){
      let userTIP = this.US.getCurrentUser().typeOfUser;
      if (userTIP == 'Putnik'){
        this.NS.setSeenByPassengerTrue('SentRequestsTrue' , this.US.getCurrentUser().id);
      }
      if (userTIP == 'Prevoznik'){
        this.NS.setSeenByDriverTrue('ReceivedRequestsTrue' , this.US.getCurrentUser().id);
      }
      this.AppComponent.setNumBadge();
    }


    



  }
}
