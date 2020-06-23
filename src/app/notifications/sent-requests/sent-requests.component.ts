import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/user.service';
import { RideService } from '../../rides/ride.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-sent-requests',
  templateUrl: './sent-requests.component.html',
  styleUrls: ['./sent-requests.component.css']
})
export class SentRequestsComponent implements OnInit {
  private listaZaPrikaz;
  date = new Date();
  private nizImaElemente;

  constructor( private US : UserService,
    private RS : RideService,
    private NS :NotificationService ) {
      this.setUpData();
     }

     setUpData(){
      this.listaZaPrikaz = this.NS.getSentRequestsFalse(this.US.getCurrentUser().id);
      this.listaZaPrikaz.forEach((element) => {
        let uniqueRide = this.RS.getRideByID(element.id_ride);
        let dateTemp = uniqueRide.timeOfDeparture;
        element["infoToShow"] = `Prevoz studenata : ${dateTemp.getDate()}/${dateTemp.getMonth()+1}/${dateTemp.getFullYear()}  ${uniqueRide.hourOfDeparture}:${uniqueRide.minuteOfDeparture} od ${uniqueRide.startingLocation} do ${uniqueRide.destination} `;
      });
      this.nizImaElemente = this.listaZaPrikaz.length > 0;

     }

  ngOnInit() {
  }

  onCancelRequest(reqID){
    this.NS.removeRequest(reqID);
    this.setUpData();
  }

}
