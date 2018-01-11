import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart} from '@angular/router';
import { Location } from '@angular/common';
import { NavbarService } from '@shared/core/navbar/navbar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public nav: NavbarService) {
    this.nav.show();
   }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-search-mobile',
  templateUrl: './search.mobile.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchMobileComponent implements OnInit {
  previousUrl: string;
  constructor(private router: Router, private location: Location, private nav: NavbarService) { 
  /*  router.events
    .filter(event => event instanceof NavigationStart)
    .subscribe(e => {
      console.log('prev:', e);
      //this.previousUrl = e.url;
    });
    */
    this.nav.hide();
  }

  ngOnInit() {
    
  }
 
  closesearch(): void{
    this.location.back();
  }
}

