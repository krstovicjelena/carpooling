import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RideService } from '../ride.service';
import { NotificationService} from '../../notifications/notification.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

import { UserService } from '../../auth/user.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-edit-ride',
  templateUrl: './edit-ride.component.html',
  styleUrls: ['./edit-ride.component.css']
})
export class EditRideComponent implements OnInit {
  private thisRideStatus;
  private editRideList ={
    id : 0,
    rideName : "string",
    idPrevoznik : -1,
    maxPassengers : -1,
    requested : [],
    rejected : [],
    passengers : [],
    stajalista:"string",
    timeOfDeparture : new Date(),
    hourOfDeparture : 1,
    minuteOfDeparture : 1,
    hourOfArrival : 1,
    minuteOfArrival : 1,
    startingLocation : "string",
    destination : "string",
    status : 'otkazana',
  }
  

 


  constructor( private dialogRef: MatDialogRef<EditRideComponent>,
     private _formBuilder: FormBuilder ,
      private RS : RideService,
      private NS : NotificationService,
      private _snackBar: MatSnackBar,
      private router : Router,
     private AppComponent :  AppComponent, 
     private US : UserService,
       @Inject(MAT_DIALOG_DATA) public data: any) {
        this.thisRideStatus = this.RS.getRideByID(this.data.row.id).status;
       
        Object.keys(this.data.row).forEach(key=>this.editRideList[key]=this.data.row[key]);      
   }

   isEditing = true;

   

  ngOnInit() {
  

  }
  

  onClick(code){
    if (code == 'ok'){
      Object.keys(this.editRideList).forEach(key=>this.data.row[key]=this.editRideList[key]);
      this.RS.getRideByID(this.data.row.id).status = this.thisRideStatus;
      if(this.thisRideStatus == "završena"){
        this.NS.addRideEnd(this.data.row.idPrevoznik, this.data.row.passengers, this.data.row.id);
        this._snackBar.open("Poslate notifikacije za završenu vožnju.", "Ukloni", {
          duration: 4000,
        });
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(["/rides"]));
      }
    }
    
    
    this.dialogRef.close();
    
    
  }

  onRemoveRide(){
    this.RS.removeRide(this.data.row.id);
    this._snackBar.open("Vožnja je uklonjena.", "Ukloni", {
      duration: 3000,
    });
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/rides"]));
    this.dialogRef.close();
  }
}
