import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../../shared/core/auth/authservice/auth.model';
@Component({
  selector: 'app-users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.css']
})
export class UsersCard implements OnInit {
@Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
