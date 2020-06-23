import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from "@angular/router";


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<SuccessComponent>, @Inject(MAT_DIALOG_DATA) public receivedData: any, private router: Router) { }

  ngOnInit() {
    
  }

  onClick(){
    this.dialogRef.close();

    
  }
  
}

