import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../auth/user.service';
import { Options } from 'ng5-slider';
import { RideService } from '../../../rides/ride.service';
import { NotificationService } from '../../notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  private usersToRate = [];

  constructor( private dialogRef: MatDialogRef<RateComponent>,
    private US : UserService,
    private RS : RideService,
    private NS :NotificationService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      let thisUserID = this.US.getCurrentUser().id;
      if ( this.data.item.id_vozac !=thisUserID ){
        this.usersToRate.push(this.data.item.id_vozac)
      }
      
      
      for (var i=0 ; i < this.data.item.id_putnik.length ; i++){
        if ( this.data.item.id_putnik[i] != thisUserID ){
          this.usersToRate.push(this.data.item.id_putnik[i])
        }
      }
      

    }

  options: Options = {
    showTicksValues: true,
    stepsArray: [
      {value: 1},
      {value: 2},
      {value: 3},
      {value: 4},
      {value: 5}
    ]
  };
  value: number = 5;
  value2: number = 5;
  value3: number = 5;

  ngOnInit() {
  }

  onClick(){
    this.dialogRef.close();   
  }

  onSubmit(form : NgForm) {
    let thisUserID = this.US.getCurrentUser().id;
    //stavljamo komentare i ocene
    this.usersToRate.forEach((element) => {
      this.US.addComment(thisUserID, element,form.value["comment"+element]);
      this.US.addRating(thisUserID, element,form.value["ocena"+element]);
    });
    //stavljamo da je trenutni korisnik dao ocenu
    this.NS.setUserRatedTrue(this.data.item.id,thisUserID);

    this._snackBar.open("Korisnik je ocenjen.", "Ukloni", {
      duration: 4000,
    });
    this.onClick();
  }

}
