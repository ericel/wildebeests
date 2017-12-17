import { Component, OnInit, HostListener, Inject, ViewChild } from '@angular/core';
import { NavbarService } from './../../core/navbar/navbar.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { MatMenuTrigger } from '@angular/material';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { State } from '../../../pizza/pizza.reducer';
import { AuthService } from '../../core/auth/authservice/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  isHeaderUp: boolean = false;
  logo: string = 'logo_w.png';
  desktop: boolean = false;
  constructor(public nav: NavbarService, public auth: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {
    nav.width$.subscribe(value => { if(value > 991){ this.desktop = true} else {this.desktop = false}});
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
  
   }
   if (isPlatformServer(this.platformId)) {
     // Server only code.
   
   }
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
    const verticalOffset = window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop || 0;

     if(verticalOffset > 40){
       this.isHeaderUp = true;
       this.logo = 'logo.png';
     }else{
     this.isHeaderUp = false;
       this.logo = 'logo_w.png';
     }
    } //browser code
   }

   showmenu(){
    this.trigger.openMenu();
    return false;
  }

}

@Component({
  selector: 'app-navbarmobile',
  templateUrl: './navbar.mobile.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarMobileComponent implements OnInit{
  isHeaderUp: boolean = false;
  logo: string = 'logo_m.png';
  mobile: boolean = false;
  startsearch: boolean = false;
  constructor(public nav: NavbarService, public auth: AuthService) {
     nav.width$.subscribe(value => { if(value < 991){ this.mobile = true} else { this.mobile = false}});
  }

  ngOnInit() {
    
  }
  @HostListener("window:scroll", []) onWindowScroll() {
    const verticalOffset = window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop || 0;

     if(verticalOffset > 40){
       this.isHeaderUp = true;
       this.logo = 'logo.png';
     }else{
     this.isHeaderUp = false;
     this.logo = 'logo_m.png';
     }
   }

   opensearch() {
    this.startsearch = true;

   }
   closesearch(){
     this.startsearch = false;
   }

}

@Component({
  selector: 'app-navbardown',
  templateUrl: './navbardown.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarDownComponent implements OnInit {
  isHeaderUp: boolean = false;
  logo: string = 'logo.png';
  constructor(public nav: NavbarService) { }

  ngOnInit() {
  }
  @HostListener("window:scroll", []) onWindowScroll() {
    const verticalOffset = window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop || 0;

     if(verticalOffset > 40){
       this.isHeaderUp = true;
       this.logo = 'logo.png';
     }else{
     this.isHeaderUp = false;
     this.logo = 'logo.png';
     }
   }
}

