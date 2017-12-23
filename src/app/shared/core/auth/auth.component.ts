import { Component, OnInit } from '@angular/core';
import { Store }        from '@ngrx/store';
import { Observable }   from 'rxjs/Observable';
import { User }         from './state/auth.model';
import * as userActions from './state/auth.actions';
interface AppState {
  user: User;
}
@Component({
    selector: 'app-auth',
    template: `<div *ngIf="user$ | async as user">
    
  
    <h1>Howdy, {{ user.displayName }}</h1>
    <h4>{{ user.uid }}</h4>
    <button *ngIf="!user.uid"
            (click)="googleLogin()" 
            [class.is-loading]="user.loading">
        Sign In with Google
    </button>
    
    <button *ngIf="user.uid"
            (click)="logout()">
            
          Logout
    </button>
  </div>`,
  styles:[`
  .is-loading {
      content: '33';
      background: red;
  }
  `]
  })
  
  export class AuthComponent {
    user$: Observable<User>;
    constructor(private store: Store<AppState>) {}
    ngOnInit() {
      this.user$ = this.store.select('user');
      this.store.dispatch(new userActions.GetUser());
    }
    googleLogin() {
      this.store.dispatch(new userActions.GoogleLogin());
    }
    logout() {
      this.store.dispatch(new userActions.Logout());
    }
  }
   