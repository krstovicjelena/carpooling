import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.css']
})
export class CommentsDialogComponent implements OnInit {
  private commentList;

  constructor(private dialogRef: MatDialogRef<CommentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private US : UserService,) { 
      this.commentList = this.US.getCommentsForId(this.US.profileToShow);
      if ( this.US.profileToShow == -1 ){
        this.US.profileToShow = this.US.getCurrentUser().id;
      }
    }

  ngOnInit() {
  }

  onClick(){
    this.dialogRef.close();
  }

}
