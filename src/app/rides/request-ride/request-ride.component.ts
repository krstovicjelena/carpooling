import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../notifications/notification.service';
import { RideService } from '../../rides/ride.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-request-ride',
  templateUrl: './request-ride.component.html',
  styleUrls: ['./request-ride.component.css']
})
export class RequestRideComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<RequestRideComponent>,
    private NS : NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private RS : RideService,
    private _snackBar: MatSnackBar,
    private AppComponent :  AppComponent) { }
  

  ngOnInit() {
  }

  onClick(){
    let bool1 = this.RS.isPassengersListFull(this.data.voznjaID);
    if (bool1){
      this._snackBar.open("Ova vožnja je puna!", "Ukloni", {
        duration: 2000,
      });
      return
    }
    let bool2 = this.RS.isUserAlreadyInPassangers(this.data.voznjaID,this.data.putnikID);
    if (bool2){
      this._snackBar.open("Već ste prijavljeni kao putnik!", "Ukloni", {
        duration: 2000,
      });
      return
    }
    let bool3 = this.NS.isPassangerRequestedARide(this.data.voznjaID,this.data.putnikID)
    if (bool3){
      this._snackBar.open("Već ste poslali zahtev!", "Ukloni", {
        duration: 2000,
      });
      return
    }


   this.NS.addRequest(this.data.prevoznikID, this.data.putnikID, this.data.voznjaID);
   this.AppComponent.setLoggedIn(true);
   this.AppComponent.setNumBadge();
   this.onClose();
    
  }
  onClose(){
    this.dialogRef.close();
  }
}
