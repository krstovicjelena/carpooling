import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RateComponent } from './rate/rate.component';
import { RideService } from '../../rides/ride.service';
import { NotificationService } from '../notification.service';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-completed-rides',
  templateUrl: './completed-rides.component.html',
  styleUrls: ['./completed-rides.component.css']
})
export class CompletedRidesComponent implements OnInit {
  private listaZaPrikaz;
  private nizImaElemente;

  constructor(
    private US : UserService,
    private RS : RideService,
    private NS :NotificationService,
    private dialog: MatDialog) { this.setUpData(); }

    setUpData(){
      this.listaZaPrikaz = this.NS.getUnrated(this.US.getCurrentUser().id);
      
      this.listaZaPrikaz.forEach((element) => {
        let uniqueRide = this.RS.getRideByID(element.id_ride);
        let dateTemp = uniqueRide.timeOfDeparture;
        element["infoToShow"] = `Prevoz studenata : ${dateTemp.getDate()}/${dateTemp.getMonth()+1}/${dateTemp.getFullYear()}  ${uniqueRide.hourOfDeparture}:${uniqueRide.minuteOfDeparture} od ${uniqueRide.startingLocation} do ${uniqueRide.destination} `;
      });
      this.nizImaElemente = this.listaZaPrikaz.length > 0;
  
     }

  ngOnInit() {
  }

  onRate(item){
    const dialogRef = this.dialog.open(RateComponent, {
      data: { item: item}},);
      //kad se zatvori dijalog ucitaj sve ponovo
      this.dialog._afterAllClosed.subscribe(() => {
        this.setUpData();
        });
  }

}
