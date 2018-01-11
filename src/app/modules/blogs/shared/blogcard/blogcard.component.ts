import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './../../state/blogs.actions';
import * as fromBlog from './../../state/blogs.reducer';
import * as moment from 'moment';
import { AuthService } from '@shared/core/auth/authservice/auth.service';
@Component({
  selector: 'app-blogcard',
  templateUrl: './blogcard.component.html',
  styleUrls: ['./blogcard.component.css']
})
export class BlogcardComponent implements OnInit {
  @Input() blog;
  @Output() checked = new EventEmitter();
  constructor(public auth: AuthService, private store: Store<fromBlog.State>) { }

  ngOnInit() {

  }

  deleteBlog(id) {
    this.store.dispatch( new actions.Delete(id) )
  }
}
