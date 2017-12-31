import { Component, OnInit,  HostListener, Input } from '@angular/core';
import { AuthService } from '../../core/auth/authservice/auth.service';
import {Title, Meta} from "@angular/platform-browser"; 
import { NavbarService } from './../../core/navbar/navbar.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from '../../services/spinner.service';
import { PasswordValidation } from './confirmpassword';
type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Input() heading;
  changeHeader: boolean = true;
  signupForm: FormGroup;
  loginForm: FormGroup;
  detailForm: FormGroup;
  passReset = false; // set to true when password reset is triggered
  userState;

  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must  include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
  };
  constructor(public auth: AuthService, public fb: FormBuilder, private spinner: SpinnerService) { }

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
      'confirmPassword': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
        ]
      ],
    },{
      validator: PasswordValidation.MatchPassword // your validation method
    });

    // Second Step
    this.detailForm = this.fb.group({
      'catchPhrase': ['', [ Validators.required ] ]
    });

    
  this.buildLoginForm();
  }


    // Using getters will make your code look pretty
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }
  get confirmPassword() { return this.signupForm.get('confirmPassword') }
  get catchPhrase() { return this.detailForm.get('catchPhrase') }


  // Step 1
  signup() {
    this.auth.emailSignUp(this.email.value, this.password.value);
  }



  // Step 2
  setCatchPhrase(user) {
    return this.auth.updateUser(user, { catchPhrase:  this.catchPhrase.value })
  }


  login(){
    this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password']);
  }
  
  buildLoginForm(){
    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });

    this.loginForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }
  
  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }
  

  resetPassword() {
    this.auth.resetPassword(this.loginForm.value['email'])
      .then(() => this.passReset = true);
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
 
