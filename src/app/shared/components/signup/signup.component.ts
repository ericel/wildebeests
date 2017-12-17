import { Component, OnInit,  HostListener, Input } from '@angular/core';
import { AuthService } from '../../core/auth/authservice/auth.service';
import {Title, Meta} from "@angular/platform-browser"; 
import { NavbarService } from './../../core/navbar/navbar.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Input() heading;
  changeHeader: boolean = true;
  signupForm: FormGroup;
  detailForm: FormGroup;

  userState;
  constructor(public auth: AuthService, public fb: FormBuilder) { }

  ngOnInit() {
    this.userState = this.auth.user.map(user => {
      if (user) {
        return user.catchPhrase ? 'complete' : 'incomplete';
      }
    })
    // First Step
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
        ]
      ],
      'region': ['', [
        ]
      ],
    });

    // Second Step
    this.detailForm = this.fb.group({
      'catchPhrase': ['', [ Validators.required ] ]
    });

    }


    // Using getters will make your code look pretty
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }

  get catchPhrase() { return this.detailForm.get('catchPhrase') }


  // Step 1
  signup() {
    return this.auth.emailSignUp(this.email.value, this.password.value)
  }

  // Step 2
  setCatchPhrase(user) {
    return this.auth.updateUser(user, { catchPhrase:  this.catchPhrase.value })
  }


  @HostListener("window:scroll", []) onWindowScroll() {
    const verticalOffset = window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop || 0;

     if(verticalOffset > 40){
       this.changeHeader = false;
     }else{
       this.changeHeader = true;
     }
   }
  
}

@Component({
  selector: 'app-login',
  template: `<app-signup [heading]="heading"></app-signup>
  <div class="container ">
      <div class="row mar-30">
          <div class="col-md-6 ">
          <h3 class="title_h">Why Should I Join <span class="primary-text">Wildebeests</span></h3> 
          <div class="justify-vertically">
             <p>adipiscing elit, sed do eiusmod tempor incididuntp
             padipiscing elit, sed do eiusmod tempor incididunt </p>
             </div>
          </div>
          <div class="col-md-6">  
              <ul class="y-ul-1">
                  <li>adipiscing elit, sed do eiusmod tempor incididunt </li>
                  <li>adipiscing elit, sed do eiusmod tempor incididunt </li>
                  <li>adipiscing elit, sed do eiusmod tempor incididunt </li>
                  <li>adipiscing elit, sed do eiusmod tempor incididunt </li>
                  <li>adipiscing elit, sed do eiusmod tempor incididunt </li>
                  <li>adipiscing elit, sed do eiusmod tempor incididunt </li>
              </ul> 
          </div>
      </div>
  </div>`,
  styleUrls: ['./signup.component.css']
})

export class LoginComponent {
  heading = "Log in to account";
  constructor(private title: Title, private meta: Meta, public nav: NavbarService) {

  }
  
  ngOnInit() {
    this.nav.show();
    this.title.setTitle('Login');
    this.meta.addTags([
      { name: 'keywords', content: 'Login to your wildebeests account.'},
      { name: 'description', content: 'Wildebeests accounts are free. Get started now by registering for a free account' }
    ]);
  }
}
 
@Component({
  selector: 'app-intro',
  templateUrl: './mainintro.component.html',
  styleUrls: ['./signup.component.css']
})

export class MainintoComponent {
  constructor() {}
  
}
 
