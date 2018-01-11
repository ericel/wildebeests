import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarService } from '@shared/core/navbar/navbar.service';
import { AuthService } from '@shared/core/auth/authservice/auth.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  constructor(public nav: NavbarService, private title: Title, private meta: Meta, public auth: AuthService) { }

  ngOnInit() {
    this.nav.show();
    this.title.setTitle('You are about to send money');
    this.meta.addTags([
      { name: 'keywords', content: 'Send money to love ones'},
      { name: 'description', content: 'No charges, No bank charges. Send money to your love ones for free.' }
    ]);
  }

}
