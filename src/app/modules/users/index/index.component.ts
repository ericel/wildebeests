import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../shared/core/navbar/navbar.service';
import { Title, Meta } from '@angular/platform-browser';
import { AuthService } from '../../../shared/core/auth/authservice/auth.service';
import { User } from '../../../shared/core/auth/authservice/auth.model';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-index',
  template:`<router-outlet></router-outlet>`,
  styleUrls: ['./index.component.css']
})
export class IndexComponent{

  constructor() { }

}


@Component({
  selector: 'app-index-users',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  constructor(private nav: NavbarService, private title: Title, private meta: Meta, private auth: AuthService) { }

  ngOnInit() {
    this.nav.show();
    this.title.setTitle('Wildebeests Users Online');
    this.meta.addTags([
      {name: 'keywords', content: 'Wildebeests users, users, users online, readers, wildebeests'},
      {name: 'description', content: 'Wildebeests users online now.'}
    ])

    this.users = this.auth.getSnapshot();
  }

}
