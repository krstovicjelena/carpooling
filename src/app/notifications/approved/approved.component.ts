import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/user.service';
import { RideService } from '../../rides/ride.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {
  private listaZaPrikaz;
  private nizImaElemente;

  constructor( private US : UserService,
    private RS : RideService,
    private NS :NotificationService ) {
      this.setUpData();
     }


  setUpData(){
    if (this.US.getCurrentUser().typeOfUser == "Putnik"){
      
      this.listaZaPrikaz = this.NS.getSentRequestsTrue(this.US.getCurrentUser().id);
    } else{
      
      this.listaZaPrikaz = this.NS.getReceivedRequestsTrue(this.US.getCurrentUser().id);
    }
    
    this.listaZaPrikaz.forEach((element) => {
      let uniqueRide = this.RS.getRideByID(element.id_ride);
      let dateTemp = uniqueRide.timeOfDeparture;
      element["infoToShow"] = `Prevoz studenata : ${dateTemp.getDate()}/${dateTemp.getMonth()+1}/${dateTemp.getFullYear()}  ${uniqueRide.hourOfDeparture}:${uniqueRide.minuteOfDeparture} od ${uniqueRide.startingLocation} do ${uniqueRide.destination} `;
    });
    this.nizImaElemente = this.listaZaPrikaz.length > 0;

   }

  ngOnInit() {
  }

}
