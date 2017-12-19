import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavbarService } from '../../../shared/core/navbar/navbar.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from './state/blogs.actions';
import * as fromBlog from './state/blogs.reducer';
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
  templateUrl: 'index.html',
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
 
  onchecked(e) {
     console.log(e);
  }

 /* deleteBlog(id) {
    this.store.dispatch( new actions.Delete(id) )
  }
  */
}

