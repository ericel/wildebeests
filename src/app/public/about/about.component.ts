import { Component, OnInit } from '@angular/core';
import {Title, Meta} from "@angular/platform-browser"; 
import { NavbarService } from '@shared/core/navbar/navbar.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private title: Title, private meta: Meta, public nav: NavbarService) {
   
 }

  ngOnInit() {
    this.nav.show();
    this.title.setTitle('About Us');
    this.meta.addTags([
      { name: 'keywords', content: 'shakedown, share all'},
      { name: 'description', content: 'We\'re building bridges, unifying the one people Africa. Find People, places, business networks all in shakedown' }
    ]);
  }

}
