import { Component, OnInit, HostListener } from '@angular/core';
import {Title, Meta} from "@angular/platform-browser"; 
import { NavbarService } from '@shared/core/navbar/navbar.service';
import { AuthService } from '@shared/core/auth/authservice/auth.service';
import { SpinnerService } from '@shared/services/spinner/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  value = 50;
  heading = '<h1>Send Money To Your Love Ones! With Litle Or No Charges.</h1><h3>No Hidden Fees!</h3>';
  constructor(private title: Title, private meta: Meta,  public nav: NavbarService,
     public auth: AuthService,
     private spinner: SpinnerService)
  {
    this.nav.show();
  }

  ngOnInit() {
    this.title.setTitle('Wildebeests | Like wildebeests we are a migrating people');
    this.meta.addTags([
      { name: 'keywords', content: 'Wildebeests, share all'},
      { name: 'description', content: 'We serve the best of baked web.' }
    ]);

    this.spinner.show('mySpinner');
  }
   
}
