import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@shared/core/auth/authservice/auth.service';
import { SpinnerComponent } from '@shared/components/notify/notify.component';
import { SpinnerService } from '@shared/services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Otenn';
  showSpinner: boolean = false;
  items: Observable<any[]>;
  constructor(private _auth: AuthService, private _spinner: SpinnerService){  
    this._spinner.show('mySpinner');
  }
  ngOnInit(){
    const auth = this._auth.getSnapshot();
    auth.subscribe((auth) => {  if (auth){
      this.showSpinner = true;
      
    }})
  }
}
