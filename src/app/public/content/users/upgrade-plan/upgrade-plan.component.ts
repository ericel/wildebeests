import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../../shared/core/navbar/navbar.service';

@Component({
  selector: 'app-upgrade-plan',
  templateUrl: './upgrade-plan.component.html',
  styleUrls: ['./upgrade-plan.component.css']
})
export class UpgradePlanComponent implements OnInit {

  constructor(private nav: NavbarService) { }

  ngOnInit() {
    this.nav.show();
  }

}
