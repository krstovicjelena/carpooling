import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { RideService } from '../ride.service';
import { UserService } from '../../auth/user.service';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from '../../auth/signup/success/success.component';
import { Router } from "@angular/router";
import { AppComponent } from '../../app.component';
import { NgForm } from '@angular/forms';
import { AllRidesComponent } from '../all-rides/all-rides.component';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-new-ride',
  templateUrl: './new-ride.component.html',
  styleUrls: ['./new-ride.component.css']
})
export class NewRideComponent implements OnInit{
  




  

  constructor(private _formBuilder: FormBuilder,
     private RS : RideService,
      private US : UserService,
       private dialog: MatDialog,
        private router: Router,
         private AppComponent : AppComponent,
         private _snackBar: MatSnackBar,) { }

  ngOnInit() {
    if(this.AppComponent.loggedIn == false){
      this.router.navigate(['/']);
    }

  }

  onSubmit(form : NgForm) {
    
   this.RS.createRide(this.US.getCurrentUser().id,form.value.name,form.value.occupancy,form.value.stop,form.value.date,form.value.sat,form.value.minut, form.value.minutd,form.value.satd,form.value.startingPoint, form.value.destination);

   this._snackBar.open("Vožnja je uspešno napravljena!", "Ukloni", {
    duration: 3500,
  });
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(["/rides"]));
 
 }

}