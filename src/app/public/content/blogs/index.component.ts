import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../shared/core/navbar/navbar.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from './state/blogs.actions';
import * as fromBlog from './state/blogs.reducer';
import * as moment from 'moment';
import { AuthService } from '../../../shared/core/auth/authservice/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-indexmain',
  template: `
  <main class="main">
  <div class="container" *ngIf="!blogs">
    <div  class="wait loader">
    <app-LoadingWait></app-LoadingWait>
  </div>
  </div>

    <div class="container">
      <div class="row mar-30">
         <app-blogcard class=" col-md-3" 
         *ngFor="let blog of blogs | async"
          [blog]="blog"></app-blogcard>
      </div>
    </div>
  </main>
  `,
  styleUrls: ['./index.component.css']
})
export class IndexMainComponent implements OnInit {
  blogs: Observable<any>;
  constructor(public auth: AuthService, private nav: NavbarService, private store: Store<fromBlog.State>) { }

  ngOnInit() {
    this.nav.show();

    this.blogs = this.store.select(fromBlog.selectAll);
    this.store.dispatch(  new actions.Query() )
  }

}

