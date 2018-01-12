import { Component, ViewEncapsulation, Inject, OnInit, Input, ViewContainerRef, OnDestroy, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotifyService } from '../../core/notify/notify.service';
import { Success } from '@modules/blogs/state/blogs.actions';
import { SpinnerService } from '@services/spinner/spinner.service';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/timer'; 
import { Observable } from 'rxjs/Observable';
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
export class ErrorDialog {
  msg: string;
  constructor(public dialogRef: MatDialogRef<any>) { }
}

@Component({
  selector: 'success',
  template: `
  <div class="alert alert-success">
  <h2>Hi! {{ msg }}!</h2>
  <p>Make each day your masterpiece. --John Wooden</p>
  <button mat-icon-button (click)="dialogRef.close()" class="closeBTN" color="warn"><mat-icon>close</mat-icon></button>
  </div>`,
  styleUrls: ['./notify.component.css']
})
export class SuccessDialog {
  msg: string;
  constructor(public dialogRef: MatDialogRef<any>) { }
}

@Component({
  selector: 'info',
  template: `
  <div class="alert alert-info">
  <h2>Hi! I am the second dialog!</h2>
  <p>Anular 2.0: https://github.com/angular/angular</p>
  <p>Angular 2 Material: https://github.com/angular/material2</p>
  <button mat-raised-button (click)="dialogRef.close()">Close dialog</button>
  </div>`
})
export class InfoDialog {
  msg: string;
  constructor(public dialogRef: MatDialogRef<any>) { }
}

const dialogs = [ErrorDialog, SuccessDialog, InfoDialog ];
const dialogsMap = {
  'error': ErrorDialog,
  'success': SuccessDialog,
  'info': InfoDialog
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

    this.notify.msg.takeUntil(Observable.timer(100));
  }
  
  /*open(key) {
    this.dialogRef = this.dialog.open(dialogsMap[key]);
    this.dialogRef.componentInstance.msg = this.message;
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }*/

  
}


@Component({
  selector: 'app-spinner',
  template:`
  <span *ngIf="show">
  <img *ngIf="loadingImage" [src]="loadingImage" />
  <ng-content></ng-content>
</span>
  `,
  styles: [`
  `]
})
export class SpinnerComponent  implements OnInit, OnDestroy{

  constructor(private spinner: SpinnerService)  {
   }

   @Input() name: string;
   @Input() group: string;
   @Input() loadingImage: string;
 
   private isShowing = false;
 
   @Input()
   get show(): boolean {
     return this.isShowing;
   }
 
   @Output() showChange = new EventEmitter();
 
   set show(val: boolean) {
     this.isShowing = val;
     this.showChange.emit(this.isShowing);
   }
 
   ngOnInit(): void {
     if (!this.name) throw new Error("Spinner must have a 'name' attribute.");
 
     this.spinner._register(this);
   }
 
   ngOnDestroy(): void {
     this.spinner._unregister(this);
   }

}
export const Dialog_COMPONENTS = [
  SuccessDialog,
  ErrorDialog,
  InfoDialog,
  SpinnerComponent
]