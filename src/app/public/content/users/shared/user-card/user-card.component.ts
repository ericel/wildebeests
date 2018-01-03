import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../../shared/core/auth/authservice/auth.service';
import { LocationService } from '../../../../../shared/services/location.service';
import { Observable } from 'rxjs/Observable';
import { Local } from './../../../../../shared/core/auth/authservice/auth.model';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./../../../money/send/send.component.css']
})
export class UserDetailCard implements OnInit {
  @Input() user0;
  local: Observable<Local>;
  constructor(public auth: AuthService, private _local: LocationService) { }

  ngOnInit() {
    this.local = this._local.getUserLocal(this.user0.uid);
  }

}
