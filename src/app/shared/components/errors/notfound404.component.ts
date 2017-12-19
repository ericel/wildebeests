import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarService } from './../../core/navbar/navbar.service';
@Component({
  selector: 'app-notfound404',
  template: `
  <!--<div class="burger">
  <div class="bun-top"></div>
  <div class="cheese"></div>
  <div class="tomato"></div>
  <div class="cheese"></div>
  <div class="cheese"></div>
  <div class="cheese"></div>
  <div class="onion"></div>
  <div class="meatball"></div>
  <div class="meatball"></div>
  <div class="meatball"></div>
  <div class="pickle"></div>
  <div class="patty"></div>
  <div class="patty"></div>
  <div class="bun-bottom"></div>
  <div class="plate"></div>
</div>-->
<main class="main">
<div class="container">
<div class="row">
    <div class="col-md-12">
        <div class="error-template">
            <h1>
                Oops!</h1>
            <img class="not-found-img" src="./assets/img/Page-not-found.png" alt="Page not found">
            <div class="error-details">
                 Sorry, an error has occured, Requested page not found!
            </div>
            <div class="error-actions">
                <a routerLink="/"  color="primary" class="btn btn-primary btn-lg">
                    Take Me Home </a><a href="contact" class="btn btn-warning btn-lg"><span class="glyphicon glyphicon-envelope"></span> Contact Support </a>
            </div>
        </div>
    </div>
</div>
</div>
</main>
  `,
  styleUrls: ['./errors.css']
})
export class Notfound404Component implements OnInit {

  constructor(private title: Title, private meta: Meta, public nav: NavbarService ) { }

  ngOnInit() {
    this.nav.show();
    this.title.setTitle("Oops..page not found!");
    this.meta.addTags([
      {name: 'keywords', content: 'Shakedown 404 Error page.'},
      {name: 'description', content: 'Shakedown 404 Error Page Not Found'}
    ])
  }

}


@Component({
  selector: 'app-LoadingWait',
  template: `
  <div class="row">
    <div class="col-md-4"  *ngFor="let item of createRange(15)">
    <div class="timeline-wrapper">
      <div class="timeline-item">
        <div class="animated-background">
            <div class="background-masker image"></div>
            <div class="background-masker header-bottom"></div>
            <div class="background-masker paragraph1-bottom"></div>
            <div class="background-masker paragraph2-bottom"></div>
            <div class="background-masker paragraph3-bottom"></div>
            <div class="background-masker paragraph4-bottom"></div>
            <div class="background-masker paragraph5-bottom"></div>
            <div class="background-masker paragraph6-bottom"></div>
        </div>
      </div>
    </div>
    </div>
  </div>`,
styleUrls: ['./errors.css']
})
export class LoadingWait implements OnInit {

constructor( ) { }

ngOnInit() {
  
}

createRange(len=30) {
  let arr = [];
  for(let i = 0; i < len ; i++) {
    arr.push(i);
  }
  return arr;
}
}
