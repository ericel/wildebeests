import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../../shared/core/navbar/navbar.service';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-detail-dealer',
  templateUrl: './detail-dealer.component.html',
  styleUrls: ['./detail-dealer.component.css']
})
export class DetailDealerComponent implements OnInit {

  constructor(private nav: NavbarService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.nav.show();
    this.title.setTitle('dealer beest dealer page');
      this.meta.addTags([
        { name: 'keywords', content: 'Send money to ....., dealer beest dealer page'},
        { name: 'description', content: 'Send money to...' }
      ]);
  }

}
