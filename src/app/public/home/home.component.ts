import { Component, OnInit, HostListener } from '@angular/core';
import {Title, Meta} from "@angular/platform-browser"; 
import { NavbarService } from './../../shared/core/navbar/navbar.service';
import { AuthService } from './../../shared/core/auth/authservice/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  value = 50;
  heading = 'Join llll greatest only \n powerful social network.';
  constructor(private title: Title, private meta: Meta,  public nav: NavbarService, public auth: AuthService) {
    this.nav.show();
  }

  ngOnInit() {
    this.title.setTitle('Wildebeests | Like wildebeests we are a migrating people');
    this.meta.addTags([
      { name: 'keywords', content: 'Wildebeests, share all'},
      { name: 'description', content: 'We serve the best of baked web.' }
    ]);
  }

}
