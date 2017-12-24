import { Component, ViewEncapsulation, Inject, OnInit, Input, ViewContainerRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotifyService } from '../../core/notify/notify.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
  selector: 'error',
  template: `
  <div class="alert alert-danger">
  <h2>Hi! {{ msg }}!</h2>
  <p>This component requires authorization.</p>
  <p> <a mat-raised-button routerLink="./login" color="primary" (click)="dialogRef.close()">Click here to login</a>
  <button mat-icon-button (click)="dialogRef.close()" class="closeBTN" color="warn"><mat-icon>close</mat-icon></button>
  </div>`,
  styleUrls: ['./notify.component.css']
})
export class Dialog1 {
  param1: string;
  constructor(public dialogRef: MatDialogRef<any>) { }
}

@Component({
  selector: 'success',
  template: `
  <div class="alert alert-success">
  <h2>Hi! I am the second dialog!</h2>
  <p>Anular 2.0: https://github.com/angular/angular</p>
  <p>Angular 2 Material: https://github.com/angular/material2</p>
  <button mat-raised-button (click)="dialogRef.close()">Close dialog</button>
  </div>`,
  styleUrls: ['./notify.component.css']
})
export class Dialog2 {
    param1: string;
  constructor(public dialogRef: MatDialogRef<any>) { }
}

@Component({
  selector: 'info-dialog',
  template: `
  <div class="alert alert-info">
  <h2>Hi! I am the second dialog!</h2>
  <p>Anular 2.0: https://github.com/angular/angular</p>
  <p>Angular 2 Material: https://github.com/angular/material2</p>
  <button mat-raised-button (click)="dialogRef.close()">Close dialog</button>
  </div>`
})
export class InfoDailog {
    param1: string;
  constructor(public dialogRef: MatDialogRef<any>) { }
}

const dialogs = [Dialog1, Dialog2];
const dialogsMap = {
  'error': Dialog1,
  'success': Dialog2,
  'info-dialog': InfoDailog
}

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotifyComponent  implements OnInit{
message: string;
  dialogRef: MatDialogRef<any>;
  constructor(public notify: NotifyService, public dialog: MatDialog,  public viewContainerRef: ViewContainerRef)  {
   }
  ngOnInit(){
   
    this.notify.msg.subscribe(data => {
      if(data){
        console.log(data)
        this.message = data.content;
        this.open(data.style);
      }
     });
  }
  
  open(key) {
    this.dialogRef = this.dialog.open(dialogsMap[key]);
    this.dialogRef.componentInstance.msg = this.message;
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }
  

  
}
