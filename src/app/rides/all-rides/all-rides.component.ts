import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RideService, Ride } from '../ride.service';
import { UserService } from '../../auth/user.service';
import { Router } from "@angular/router";
import { AppComponent } from '../../app.component';
import { Options, LabelType } from 'ng5-slider';
import { MatDialog } from '@angular/material';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RequestRideComponent } from '../request-ride/request-ride.component';
import {EditRideComponent} from '../edit-ride/edit-ride.component';
// import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-all-rides',
  templateUrl: './all-rides.component.html',
  styleUrls: ['./all-rides.component.css']
})
export class AllRidesComponent implements OnInit, AfterViewInit {

  value: number = 0;
  highValue: number = 24;
  options: Options = {
    floor: 0,
    ceil: 24,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Earliest hour:</b> ' + value;
        case LabelType.High:
          return '<b>Latest hour:</b> ' + value;
        default:
          return value.toString();
      }
    }
  };

  



  displayedColumns = ["rideName","idPrevoznik","timeOfDeparture", "hourOfDeparture","minuteOfDeparture","startingLocation","stajalista","hourOfArrival","minuteOfArrival", "destination", "passengers",  "maxPassengers", "status","action"];
  rideSource = new MatTableDataSource<Ride>();
  temp:number;
  rideToggle:boolean;

  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;


  constructor(private RS : RideService, private US : UserService, private router : Router, private AppComponent : AppComponent, private _formBuilder: FormBuilder, private dialog: MatDialog) { }
  
  
  doFilter(filterValue : string){
    this.rideSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    if(this.AppComponent.loggedIn == false){
      this.router.navigate(['']);
    }
    
    this.rideToggle=true;
    // uzimamo ID od logovanog usera - odnosno naseg vozaca
    // i uzimamo voznje za njega
    if (this.US.getCurrentUser().typeOfUser == 'Prevoznik'){
      this.rideSource.data = this.RS.getRidesForDriverID(this.US.getCurrentUser().id);
    } else {
      this.rideSource.data = this.RS.getRides();
    }
    console.log(this.RS.getRideByID(1).status =='otkazana')
    
    
    //console.log(this.rideSource);


  }

  requestRide(row){
  
    const dialogRef = this.dialog.open(RequestRideComponent, {
      
      data: {
        prevoznikID : row.idPrevoznik,
        voznjaID : row.id,
        putnikID : this.US.getCurrentUser().id
      }},);
  }

  editRide(row){
    const dialogRef = this.dialog.open(EditRideComponent, {data:{row:row}});
  }


  ngAfterViewInit() {
    this.rideSource.sort = this.sort;
    this.rideSource.paginator = this.paginator;
  } 

  viewProfile(idPrevoznik:number){
    this.US.profileToShow=idPrevoznik;
  }

  
}
