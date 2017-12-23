import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotifyService } from '../../core/notify/notify.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotifyComponent  implements OnInit{
  animal: string;
  name: string;
  constructor(public notify: NotifyService, public dialog: MatDialog)  {
   }
  ngOnInit(){
    this.notify.msg.subscribe(data => {
     if(data){
       this.openDialog();
     }
    });
   
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogNotify, {
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

}

@Component({
  selector: 'notify-dialog',
  template:`<app-notify></app-notify>`,
})
export class DialogNotify {

  constructor(
    public dialogRef: MatDialogRef<DialogNotify>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public notify: NotifyService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}