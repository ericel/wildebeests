import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../../shared/core/navbar/navbar.service';

@Component({
  selector: 'app-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  constructor(private nav: NavbarService) { }

  ngOnInit() {
    this.nav.show();
  }

}
