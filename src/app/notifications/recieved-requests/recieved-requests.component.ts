import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/user.service';
import { RideService } from '../../rides/ride.service';
import { NotificationService } from '../notification.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-recieved-requests',
  templateUrl: './recieved-requests.component.html',
  styleUrls: ['./recieved-requests.component.css']
})
export class RecievedRequestsComponent implements OnInit {
  private listaZaPrikaz;
  private nizImaElemente;
  

  constructor(private US : UserService,
    private RS : RideService,
    private NS :NotificationService,
    private router : Router) {
      this.setUpData()
      
      
    }

  ngOnInit() {
  }

  

  setUpData(){
    
    this.listaZaPrikaz = this.NS.getReceivedRequestsFalseDriver(this.US.getCurrentUser().id);
    this.listaZaPrikaz.forEach((element) => {
      let uniqueRide = this.RS.getRideByID(element.id_ride);
      let dateTemp = uniqueRide.timeOfDeparture;
      element["infoToShow"] = `Prevoz studenata : ${dateTemp.getDate()}/${dateTemp.getMonth()+1}/${dateTemp.getFullYear()}  ${uniqueRide.hourOfDeparture}:${uniqueRide.minuteOfDeparture} od ${uniqueRide.startingLocation} do ${uniqueRide.destination} `;
    });
    this.nizImaElemente = this.listaZaPrikaz.length > 0;

  }


  onDeny(notifID){
    this.NS.setAsRejectedRequest(notifID);
    this.setUpData();
  }

  onApprove(notifID:number , id_ride:number, id_putnik:number){
    this.RS.addPassangerToPassangerList(id_ride , id_putnik);
    this.NS.setAsApproved(notifID);
    this.setUpData();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['notifications']));
  }
}
