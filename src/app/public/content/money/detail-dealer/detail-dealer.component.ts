import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../../shared/core/navbar/navbar.service';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../../shared/services/spinner.service';
@Component({
  selector: 'app-detail-dealer',
  templateUrl: './detail-dealer.component.html',
  styleUrls: ['./detail-dealer.component.css']
})
export class DetailDealerComponent implements OnInit {
isValid;
  constructor(private nav: NavbarService,
    private title: Title,
    private meta: Meta,
    private router: Router,
    private spinner: SpinnerService,
    
  ) { this.spinner.hideAll();}

  ngOnInit() {
    
    this.nav.show();
    this.title.setTitle('dealer beest dealer page');
      this.meta.addTags([
        { name: 'keywords', content: 'Send money to ....., dealer beest dealer page'},
        { name: 'description', content: 'Send money to...' }
      ]);
   
  }

  deal($event){
    this.spinner.show('mySpinner');
    //this.router.navigate(['money/send/FhBtM70QZKM']);
  }
}
