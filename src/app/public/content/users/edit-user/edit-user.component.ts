import { Component, OnInit, Inject, ElementRef, ViewChild, OnChanges, OnDestroy} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { NavbarService } from '../../../../shared/core/navbar/navbar.service';
import { AuthService } from '../../../../shared/core/auth/authservice/auth.service';
import { User } from '../../../../shared/core/auth/authservice/auth.model';
import { Local } from './../../../../shared/core/auth/authservice/auth.model';
import { Observable } from 'rxjs/Observable';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../../../shared/core/notify/notify.service';
import { LocationService } from '../../../../shared/services/location.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CountryService } from '../../../../shared/components/country-picker/country.service';
import { Upload } from './../../../../shared/services/upload/upload.model';
import { UploadService } from '../../../../shared/services/upload/upload.service';
import { DealsService } from '../../../../shared/services/deals/deals.service';


type formFields = 'facebook' | 'twitter' | 'email' | 'phone' | 'address' | 'city' | 'country' | 'fullname' | 'username' 
| 'means' | 'period' | 'othertranc' | 'transcountries' | 'services';
type FormErrors = { [u in formFields]: string };
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  user: Observable<User>;
  deathSpinner: boolean = false;
  local: Observable<Local>;
  _auth;
  user$;
  deals: Observable<any>;
  dealersAddon;
  constructor(private nav: NavbarService,
   private auth: AuthService,
   private spinner: SpinnerService,
   private title: Title,
   private meta: Meta,
   private router: Router,
   private route: ActivatedRoute,
   private notify: NotifyService,
   private _local: LocationService,
   public dialog: MatDialog,
   private sanitizer: DomSanitizer,
   private _upload: UploadService,
   private _deals: DealsService
  ) { 

    

  }

  ngOnInit() {
    this.nav.show();
    this.auth.user.subscribe(auth => {if(auth)
    this.local = this._local.getUserLocal(auth.uid);
    this.deals = this._deals.getUserAddOn(auth.uid);
    this.deals.subscribe(dealersAddon => this.dealersAddon = dealersAddon)
    this._auth = auth;
    this.route.params.subscribe(params => {
      const uid = params['id'];
        this.user = this.auth.getUser(uid);
        this.user.subscribe(user =>{
          this.user$ = user;
          if(!user || user.uid !== auth.uid){
            this.auth.back();
          }
          if(!user.roles.user){
            this.spinner.show('dealerSpinner');
            this.deathSpinner = true;
            this.notify.update('<strong>Bad Route</strong>! You\'ll be redirected!', 'error');
            setTimeout(()=>{  
             this.auth.back();
            },3000);
          } 
  
          this.title.setTitle(user.displayName.username + ' Edit Wildebeests profile!');
          this.meta.addTags([
          { name: 'keywords', content: user.displayName.username + ' Edit Wildebeests profile!'},
          { name: 'description', content: user.displayName.username + ' Edit Wildebeests profile!' }
        ]);
        });
    })
  })
  }

  openBio() {
    this.dialog.open(Dialog1, {
      data: {
        uid: this._auth.uid,
        bio: this._auth.bio
      }
    });
  }

  openCountry() {
    this.dialog.open(Dialog2, {
      data: {
        uid: this._auth.uid,
        country: this._auth.contactInfo.country,
        city: this._auth.contactInfo.city,
        address: this._auth.contactInfo.region
      }
    });
  }
  openLinks() {
    this.dialog.open(Dialog3, {
      data: {
        uid: this._auth.uid,
        facebook: this._auth.verified.links.facebook,
        twitter: this._auth.verified.links.twitter,
        email: this._auth.verified.links.email,
        phone: this._auth.verified.links.phone
      }
    });
  }

  openUpgrade() {
    this.dialog.open(Dialog4, {
      data: {
        uid: this._auth.uid,
        email: this._auth.verified.links.email,
        username: this._auth.displayName.username,
        phone: this._auth.verified.links.phone
      }
    });
  }


  openHeader() {
    this.dialog.open(DialogHeader, {
      data: {
        uid: this._auth.uid,
        fullname: this._auth.displayName.fullname,
        username: this._auth.displayName.username,
        phone: this._auth.verified.links.phone,
        photoUrl: this._auth.photoURL,
        count: this._auth.displayName.editCount
      }
    });
  }

  opentranc() {
    this.dialog.open(DialogTranc, {
      data: {
        uid: this._auth.uid,
        services: this.dealersAddon.services,
        means: this.dealersAddon.po_means,
        period: this.dealersAddon.po_period,
        tranccountries: this.dealersAddon.po_countries
      }
    });
  }

  close(): void {
    this.dialog.closeAll();
  }

  ngOnDestroy (){
    this.close();
  }
}

@Component({
  selector: 'dialog-1',
  template:`
  <div class="block-dialog card">
  <div class="card-header">
  <!--<button mat-icon-button (click)="iheading()"><mat-icon>home</mat-icon></button>-->
   <button mat-icon-button (click)="iBold()"><mat-icon>format_bold</mat-icon></button>
   <button mat-icon-button (click)="iItalic()"><mat-icon>format_italic</mat-icon></button>
   <button mat-icon-button (click)="iUnderline()"><mat-icon>format_underlined</mat-icon></button>
   <button mat-icon-button (click)="iForeColor()"><mat-icon>color_lens</mat-icon></button>
   <button mat-icon-button (click)="iFontSize()"><mat-icon>format_size</mat-icon></button>
   <button mat-icon-button (click)="ijustifyCenter()"><mat-icon>format_align_center</mat-icon></button>
   <button mat-icon-button (click)="iHorizontalRule()"><mat-icon>border_horizontal</mat-icon></button>
   <button mat-icon-button (click)="iUnorderedList()"><mat-icon>format_list_numbered</mat-icon></button>
   <button mat-icon-button (click)="iOrderedList()"><mat-icon>format_list_bulleted</mat-icon></button>
   <button mat-icon-button (click)=" istrikeThrough()"><mat-icon>format_strikethrough</mat-icon></button>
   <button mat-icon-button (click)="iLink()"><mat-icon>insert_link</mat-icon></button>
   
   
   <span class="float-right">
       
       <button mat-icon-button (click)="updateBio()" title="Save Bio"><mat-icon color="primary">publish </mat-icon></button>
   </span>
</div>

<div class="card-block">
  
       <iframe  class="richtextfield make-full-height" #richtextarea  ></iframe>

</div>
  </div>
  `,
  styleUrls: ['./edit-user.component.css']
  
})
export class Dialog1 implements OnInit {
  bioForm: FormGroup;
  @ViewChild('richtextarea') richtextarea: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public fb: FormBuilder, private auth: AuthService, private notify: NotifyService,
  private sanitizer: DomSanitizer
  ) {
   
  }

  ngOnInit(){
    this.buildBioForm();
    this.iFrameOn();
    this.richtextarea.nativeElement.contentDocument.body.innerHTML = this.data.bio;
  }

  buildBioForm(){
    this.bioForm = this.fb.group({
      'password': ['', [
        Validators.required,
        Validators.email
        ]
      ]
    });
  }

  updateBio(){
    if(this.textarea.length > 70){
      if(this.data.uid){
        this.auth.updateBio(this.data.uid, this.textarea);
      };
     
  } else {
    this.notify.update("<strong>More Bio info required!</strong> Way to go.", 'error')
  }
  }
  get textarea() { 
    var Body = this.richtextarea.nativeElement.contentDocument.body;
    Body = Body.innerHTML
    return Body;
  }
   //The editor wysiwyg
   iFrameOn(){
    this.richtextarea.nativeElement.contentDocument.designMode = "On";
  }

  iBold(){
    
    this.richtextarea.nativeElement.contentDocument.execCommand('bold',  null, null);
  }

  iUnderline(){
    this.richtextarea.nativeElement.contentDocument.execCommand('underline', false, null);
  }

  iFontSize(){
    var size = prompt('Enter a size 1 - 7', '');
    this.richtextarea.nativeElement.contentDocument.execCommand('FontSize', false, size);
  }

  iForeColor(){
    var color = prompt('Define a basic color or apply a hexadecimal color code for advanced colors:', '');
    this.richtextarea.nativeElement.contentDocument.execCommand('ForeColor',false,color);
  }
  iHorizontalRule(){
    this.richtextarea.nativeElement.contentDocument.execCommand('inserthorizontalrule',false,null);
  }
  iItalic(){
    this.richtextarea.nativeElement.contentDocument.execCommand('italic',false,null);
  }
  iUnorderedList(){
    this.richtextarea.nativeElement.contentDocument.execCommand("InsertOrderedList", false,"newOL");
  }
  iOrderedList(){
    this.richtextarea.nativeElement.contentDocument.execCommand("InsertUnorderedList", false,"newUL");
  }
  iLink(){
    var linkURL = prompt("Enter the URL for this link:", "http://"); 
    this.richtextarea.nativeElement.contentDocument.execCommand("CreateLink", false, linkURL);
  }
  iUnLink(){
    this.richtextarea.nativeElement.contentDocument.execCommand("Unlink", false, null);
  }
  enableObjectResizing(){
    this.richtextarea.nativeElement.contentDocument.execCommand("enableObjectResizing", false, null)
  }
  iheading(){

   var headingT = prompt("Enter title tag :", "H1, H2"); 
   this.richtextarea.nativeElement.contentDocument.execCommand("heading", false, headingT);
  }
  ijustifyCenter(){
    this.richtextarea.nativeElement.contentDocument.execCommand("justifyCenter", false, null)
  }
  istrikeThrough(){
    this.richtextarea.nativeElement.contentDocument.execCommand("strikeThrough", false, null)
  }
}

@Component({
  selector: 'dialog-2',
  template:`
  <div class="block-dialog card">
  <div class="card-header">
    Edit Account Info
  </div>
  <div class="card-block">
  <div class="info">
  <form  [formGroup]="dailog2Form" (ngSubmit)="dailog2FormSubmit()" *ngIf="data.uid">
  <mat-form-field>
    <input matInput placeholder="Your Address" [(value)]="data.address" formControlName="address" required>
    <div *ngIf="formErrors.address" class="alert alert-danger">
      {{ formErrors.address }}
    </div>
  </mat-form-field>

  <mat-form-field>
  <input matInput placeholder="Your City" [(value)]="data.city" formControlName="city" required>
  <div *ngIf="formErrors.city" class="alert alert-danger">
    {{ formErrors.city }}
  </div>
  </mat-form-field>
  <mat-form-field>
   <mat-select *ngIf="selected" [(value)]="selected" formControlName="country" required>
   
      <mat-option *ngFor="let option of countries" [value]="option.countryName">{{ option.countryName }}</mat-option>
   </mat-select>
   <div *ngIf="formErrors.country" class="alert alert-danger">
     {{ formErrors.country }}
   </div>
  </mat-form-field>


    <span>{{notifytext}}</span>
  <button class="w-100" mat-raised-button color="primary" type="submit" [disabled]="!dailog2Form.valid"><app-spinner name="mySpinner1" [(show)]="spinnerShowing1"><i class="fa fa-spinner fa-spin"></i></app-spinner><mat-icon>publish</mat-icon> Save Changes</button>
 
  </form>
</div>
  </div>
  </div>
  `,
  styleUrls: ['./edit-user.component.css']
  
})

export class Dialog2 implements OnInit {
  dailog2Form: FormGroup;
  selected: string;
  notifytext: string ='';
  formErrors: FormErrors = {
    'facebook': '',
    'twitter': '',
    'email': '',
    'phone': '',
    'address': '',
    'city': '',
    'country': '',
    'fullname': '',
    'username': '',
    'means': '',
    'period': '',
    'othertranc': '',
    'transcountries': '',
    'services': ''
  };
  validationMessages = {
    'address': {
      'required': 'Address is required.',
      'minlength': 'Address must be at least 4 characters long.',
      'maxlength': 'Address cannot be more than 100 characters long.',
    },
    'city': {
      'required': 'City is required.',
      'minlength': 'City must be at least 4 characters long.',
      'maxlength': 'City cannot be more than 100 characters long.',
    },
    'country': {
      'required': 'Country is required.',
      'minlength': 'Country must be at least 2 characters long.',
      'maxlength': 'Country cannot be more than 100 characters long.',
    },
  };
  public countries: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private _countries: CountryService,
  public fb: FormBuilder, private auth: AuthService,
  private spinner: SpinnerService
  ) {
    
  }
 
  ngOnInit(){
    this.countries = this._countries.getCountries();
   // this._countries.getCountries().subscribe(countries => { console.log(countries)});
    this.selected = 'Goldfish';
    this.builddailog2Form();
  }

  builddailog2Form(){
    this.dailog2Form = this.fb.group({
      'address': [this.data.address, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)
        ]
      ],
      'city': [this.data.city, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)
        ]
      ],
      'country': [this.data.country, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
        ]
      ]
    });
    this.dailog2Form.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }
  
    onValueChanged(data?: any) {
      if (!this.dailog2Form) { return; }
      const form = this.dailog2Form;
      for (const field in this.formErrors) {
        if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'address' || field === 'city' || field === 'country')) {
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

    dailog2FormSubmit(){
      this.spinner.show('mySpinnerg1');
      this.auth.updateContactInfo(this.data.uid, this.dailog2Form.value['address'], this.dailog2Form.value['city'], this.dailog2Form.value['country']);
    }
}
@Component({
  selector: 'dialog-3',
  template:`
  <div class="block-dialog card">
  <div class="card-header">
    Edit Account Info
  </div>
  <div class="card-block">
  <div class="info">
  <form  [formGroup]="dailog3Form" (ngSubmit)="dailog3FormSubmit()" *ngIf="data.uid">
  <mat-form-field>
    <input matInput placeholder="Your Facebook Profile Link" [(value)]="data.facebook" formControlName="facebook" required>
    <div *ngIf="formErrors.facebook" class="alert alert-danger">
      {{ formErrors.facebook }}
    </div>
  </mat-form-field>
  <mat-form-field>
  <input matInput placeholder="Your Twitter Profile Link" [(value)]="data.twitter" formControlName="twitter" required>
  <div *ngIf="formErrors.twitter" class="alert alert-danger">
    {{ formErrors.twitter }}
  </div>
</mat-form-field>
<mat-form-field>
<ng-template [ngIf]="emailFail">
  <input matInput placeholder="Confirm Account Email" formControlName="email"  value="{{data.email}}"  required>
</ng-template>
<ng-template [ngIf]="!emailFail">
  <input matInput placeholder="Confirm Account Email" formControlName="email"  value="{{data.email}}"  readonly>
</ng-template>
<div *ngIf="formErrors.email" class="alert alert-danger">
  {{ formErrors.email }}
</div>
</mat-form-field>
  <mat-form-field>
  <input matInput placeholder="Your phone" [(value)]="data.phone" formControlName="phone" required>
  <div *ngIf="formErrors.phone" class="alert alert-danger">
    {{ formErrors.phone }}
  </div>
  </mat-form-field>

    <span>{{notifytext}}</span>
  <button class="w-100" mat-raised-button color="primary" type="submit" [disabled]="!dailog3Form.valid"><app-spinner name="mySpinner3" [(show)]="spinnerShowing"><i class="fa fa-spinner fa-spin"></i></app-spinner><mat-icon>publish</mat-icon> Save Changes</button>
 
  </form>
</div>
  </div>
  </div>
  `,
  styleUrls: ['./edit-user.component.css']
  
})
export class Dialog3 implements OnInit {
  dailog3Form: FormGroup;
  selected: string;
  notifytext: string ='';
  emailFail: boolean;
  email: string;
  formErrors: FormErrors = {
    'facebook': '',
    'twitter': '',
    'email': '',
    'phone': '',
    'address': '',
    'city': '',
    'country': '',
    'fullname': '',
    'username': '',
    'means': '',
    'period': '',
    'othertranc': '',
    'transcountries': '',
    'services': ''
  };
  validationMessages = {
    'facebook': {
      'required': 'Address is required.',
      'minlength': 'Address must be at least 4 characters long.',
      'maxlength': 'Address cannot be more than 100 characters long.',
    },
    'twitter': {
      'required': 'City is required.',
      'minlength': 'City must be at least 4 characters long.',
      'maxlength': 'City cannot be more than 100 characters long.',
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'phone': {
      'required': 'Country is required.',
      'minlength': 'Country must be at least 2 characters long.',
      'maxlength': 'Country cannot be more than 100 characters long.',
    }
  };
  public countries: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private _countries: CountryService,
  public fb: FormBuilder, private auth: AuthService,
  private spinner: SpinnerService
  ) {
    
  }
 
  ngOnInit(){
    this.countries = this._countries.getCountries();
   // this._countries.getCountries().subscribe(countries => { console.log(countries)});
    this.selected = this.data.country;
    this.builddailog3Form();
    this.checkValidEmail();
  }

  builddailog3Form(){
    this.dailog3Form = this.fb.group({
      'facebook': [this.data.facebook, [
        Validators.required,
        Validators.pattern,
        Validators.minLength(4),
        Validators.maxLength(100)
        ]
      ],
      'twitter': [this.data.twitter, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern,
        Validators.maxLength(100)
        ]
      ],
      'email': [this.data.email, [
        Validators.minLength(2),
        Validators.maxLength(100)
        ]
      ],
      'phone': [this.data.phone, [
        Validators.required,
        Validators.pattern,
        Validators.minLength(2),
        Validators.maxLength(100)
        ]
      ]
    });
    this.dailog3Form.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }
  
    onValueChanged(data?: any) {
      if (!this.dailog3Form) { return; }
      const form = this.dailog3Form;
      for (const field in this.formErrors) {
        if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'facebook' || field === 'twitter' || field === 'email' || field === 'phone')) {
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
   checkValidEmail(){
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(EMAIL_REGEXP.test(this.data.email)){
      this.emailFail = false;
      this.email = this.data.email;
    } else {
      this.emailFail = true;
    }
   }

   get getemail(){
    return this.dailog3Form.value['email']
   }
    dailog3FormSubmit(){
      this.spinner.show('mySpinnerg3');
      if(this.emailFail){
       this.email = this.dailog3Form.value['email']
      }
      this.auth.updateVerifiedLinks(this.data.uid, this.dailog3Form.value['facebook'], this.dailog3Form.value['twitter'], this.email, this.dailog3Form.value['phone']);
    }
  
}
@Component({
  selector: 'dialog-4',
  template:`
  <div class="block-dialog card">
  <div class="card-header">
    Upgrade Your Account!
  </div>
  <div class="card-block">
   <div class="info-upgrade">
      <div class="card-title h3"> <strong>{{data.username}}!</strong> We are humble to know you are thinking <br>of upgrading your account.</div> 


      <a class="w-100" mat-raised-button color="accent" routerLink="users/upgrade-plan">Click here to upgrade your account!</a>
   </div>
  </div>
  </div>
  `,
  styleUrls: ['./edit-user.component.css']
  
})
export class Dialog4 implements OnInit {
  dailog4Form: FormGroup;
  formErrors: FormErrors = {
    'facebook': '',
    'twitter': '',
    'email': '',
    'phone': '',
    'address': '',
    'city': '',
    'country': '',
    'fullname': '',
    'username': '',
    'means': '',
    'period': '',
    'othertranc': '',
    'transcountries': '',
    'services': ''
  };
  validationMessages = {
    'fullname': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be at least 4 characters long.',
      'maxlength': 'Full Name cannot be more than 50 characters long.',
    },
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 4 characters long.',
      'maxlength': 'username cannot be more than 50 characters long.',
    }
  };
  public countries: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  ) {
    
  }
 
  ngOnInit(){
 
  }

 
  
}
@Component({
  selector: 'dialog-header',
  template:`
  <div class="block-dialog card photo-c">
  <div class="card-header">
  <div class="head-0">
      <img mat-card-image src="{{data.photoUrl || './assets/img/avatar.png'}}" alt="{{data.username}}">
    </div>
    <div class="text-center avatar">
      <img mat-card-avatar src="{{data.photoUrl || './assets/img/avatar.png'}}" class="img-thumbnail" alt="{{data.username}}">
    </div>
    <div class="text-center">
    <label class="custom-file ">
      <input type="file" id="file" #file class="custom-file-input" 
      (change)="detectFiles($event)" (change)="fileChanged($event)">
      <span class="custom-file-control"></span>
    </label>
   
    <div *ngIf="currentUpload" class="text-center mar-30" >
     <mat-progress-bar mode="determinate" value="{{ currentUpload?.progress }}"></mat-progress-bar>
      <div class="alert alert-info">Progress: {{currentUpload?.name}} | {{currentUpload?.progress}}% Complete</div>
    </div>
    </div>
   
    <mat-card-title class="text-center title">{{data.username}}</mat-card-title>
      <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          Change your name!
        </mat-panel-title>
        <mat-panel-description class="text-danger">
          This action can be done just once!
        </mat-panel-description>
      </mat-expansion-panel-header>
      <div class="info">
      <form  [formGroup]="dailog4Form" (ngSubmit)="dailog4FormSubmit()" *ngIf="data.uid">
      <mat-form-field>
        <input matInput placeholder="Your Full Name" [(value)]="data.fullname" formControlName="fullname" required>
        <div *ngIf="formErrors.fullname" class="alert alert-danger">
          {{ formErrors.fullname }}
        </div>
     </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Your Username" [(value)]="data.username" formControlName="username" required>
        <div *ngIf="formErrors.username" class="alert alert-danger">
          {{ formErrors.username }}
        </div>
      </mat-form-field>
      <button class="w-100" mat-raised-button color="primary" type="submit" [disabled]="!dailog4Form.valid"><app-spinner name="mySpinner4" [(show)]="spinnerShowing"><i class="fa fa-spinner fa-spin"></i></app-spinner><mat-icon>publish</mat-icon> Save Changes</button>
      </form>
      </div>
    </mat-expansion-panel>

  </div>

  </div>
  `,
  styleUrls: ['./edit-user.component.css']
  
})
export class DialogHeader implements OnInit {
  @ViewChild('file') file: ElementRef;
  dailog4Form: FormGroup;
  selectedFiles: FileList | null;
  currentUpload: Upload;
  formErrors: FormErrors = {
    'facebook': '',
    'twitter': '',
    'email': '',
    'phone': '',
    'address': '',
    'city': '',
    'country': '',
    'fullname': '',
    'username': '',
    'means': '',
    'period': '',
    'othertranc': '',
    'transcountries': '',
    'services': ''
  };
  validationMessages = {
    'fullname': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be at least 4 characters long.',
      'maxlength': 'Full Name cannot be more than 100 characters long.',

    },
    'username': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be at least 4 characters long.',
      'maxlength': 'Full Name cannot be more than 100 characters long.',
    }
  };
  public countries: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public fb: FormBuilder, private auth: AuthService,
  private spinner: SpinnerService,
  private _upload: UploadService,
  private _notify: NotifyService
  ) {
    
  }
 
  ngOnInit(){
    this.builddailog4Form();
  }

  builddailog4Form(){
    this.dailog4Form = this.fb.group({
      'fullname': [this.data.fullname, [
        Validators.required,
        Validators.pattern,
        Validators.minLength(4),
        Validators.maxLength(50)
        ]
      ],
      'username': [this.data.username, [
        Validators.required,
        Validators.pattern,
        Validators.minLength(4),
        Validators.maxLength(50)
        ]
      ]
    });
    this.dailog4Form.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }
  
    onValueChanged(data?: any) {
      if (!this.dailog4Form) { return; }
      const form = this.dailog4Form;
      for (const field in this.formErrors) {
        if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'username' || field === 'fullname')) {
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

    dailog4FormSubmit(){
      this.spinner.show('mySpinnerg4');
     this.auth.updateUsername(this.data.uid, this.dailog4Form.value['username'], this.dailog4Form.value['fullname'], this.data.count);
    }
  

   detectFiles($event: Event) {
      this.selectedFiles = ($event.target as HTMLInputElement).files;
   }

  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      this._upload.pushUpload(this.data.uid, this.currentUpload);
    } else {
      this._notify.update("<strong>No file found!</strong> upload again.", 'error')
    }
  }

  getFileLater() {
    console.log(this.file.nativeElement.files[0]);
  }

  fileChanged(event) {
    this.file.nativeElement.disabled = true;
    this.uploadSingle()
    this.file.nativeElement.disabled = true;
  }


}
@Component({
  selector: 'dialog-tranc',
  template:`
  <div class="block-dialog card">
  <div class="card-header">
    Dealers More Account Info
    <div class="alert alert-infor">This info helps guarantees your success here! So Please provide as more detail info as possible</div>
  </div>
  <div class="card-block">
  <div class="info">
  <form  [formGroup]="trancForm" (ngSubmit)="trancFormSubmit()" *ngIf="data.uid">
  <mat-form-field >
  <textarea matInput placeholder="Short Description of Your services" [(value)]="data.services" formControlName="service" required></textarea>
  <div *ngIf="formErrors.service" class="alert alert-danger">
      {{ formErrors.service }}
    </div>
  </mat-form-field>
  <div class="row mar-30">
  <div class="col-md-6">
  <label>Choose Hour long it takes to finalize transaction</label>
      <select multiple class="form-control" placeholder="Payout Duration" [(value)]="data.period" formControlName="period" required>
          <option value="Within Ours of Deal, if daytime">Within Ours of Deal, if daytime</option>
          <option value="Next Business Day">Next Business Day</option>
          <option value="Within 2 days">Within 2 days</option>
          <option value="Within 3 days">Within 3 days</option>
      </select>
        <div *ngIf="formErrors.period" class="alert alert-danger">
          {{ formErrors.period }}
        </div>

   </div>
    <div class="col-md-6">
        <label>Choose Hour long it takes to finalize transaction</label>
        <select multiple class="form-control" placeholder="Payout Countries" [(value)]="data.countries" formControlName="countries" required>
            <option value="Cameroon">Cameroon</option>
            <option value="Nigeria">Next Business Day</option>
            <option value="Within 2 days">Within 2 days</option>
            <option value="Within 3 days">Within 3 days</option>
        </select>
        <div *ngIf="formErrors.countries" class="alert alert-danger">
          {{ formErrors.countries }}
        </div>

    </div>
  </div>

 
  <label>How do you pay out?</label>
  <select multiple class="form-control" placeholder="How do you pay out?" [(value)]="data.means" formControlName="means" required>
      <option value="Bank">Bank Wire Transfer</option>
      <option value="Express Union">Express Union</option>
      <option value="In Person">In Person (not recommended)</option>
      <option value="Mobile Money">Mobile Money</option>
  </select>
  <div *ngIf="formErrors.means" class="alert alert-danger">
    {{ formErrors.means }}
  </div>
 
  <button class="w-100" mat-raised-button color="primary" type="submit" [disabled]="!trancForm.valid"><app-spinner name="mySpinner3" [(show)]="spinnerShowing"><i class="fa fa-spinner fa-spin"></i></app-spinner><mat-icon>publish</mat-icon> Save Changes</button>
 
  </form>
</div>
  </div>
  </div>
  `,
  styleUrls: ['./edit-user.component.css']
  
})
export class DialogTranc implements OnInit {
  @ViewChild('file') file: ElementRef;
  trancForm: FormGroup;
  selectedFiles: FileList | null;
  currentUpload: Upload;
  formErrors: FormErrors = {
    'facebook': '',
    'twitter': '',
    'email': '',
    'phone': '',
    'address': '',
    'city': '',
    'country': '',
    'fullname': '',
    'username': '',
    'means': '',
    'period': '',
    'othertranc': '',
    'transcountries': '',
    'services': ''
  };
  validationMessages = {
    'service': {
      'required': 'Service is required.',
      'minlength': 'Service must be at least 50 characters long.',
      'maxlength': 'Service cannot be more than 200 characters long.',

    },
    'period': {
      'required': 'Payout duration is required.',
    },
    'countries': {
      'required': 'Payout country is required.',
    },
    'means': {
      'required': 'Payout means is required.',
      'minlength': 'Payout means must be at least 4 characters long.',
      'maxlength': 'Payout means cannot be more than 100 characters long.',
    }
  };
  public countries: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public fb: FormBuilder, private auth: AuthService,
  private spinner: SpinnerService,
  private _upload: UploadService,
  private _notify: NotifyService,
  private _deals: DealsService
  ) {
    
  }
 
  ngOnInit(){
    this.trancFormBuild();
  }

  trancFormBuild(){
    this.trancForm = this.fb.group({
      'service': [this.data.services, [
        Validators.required,
        Validators.pattern,
        Validators.minLength(50),
        Validators.maxLength(200)
        ]
      ],
      'period': [this.data.period, [
        Validators.required
        ]
      ],
      'countries': [this.data.countries, [
        Validators.required
        ]
      ],
      'means': [this.data.means, [
        Validators.required
        ]
      ]
    });
    this.trancForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }
  
    onValueChanged(data?: any) {
      if (!this.trancForm) { return; }
      const form = this.trancForm;
      for (const field in this.formErrors) {
        if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'service' 
        || field === 'countries' || field === 'period' || field === 'means')) {
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

    trancFormSubmit(){
      this.spinner.show('mySpinnerg4');
      this._deals.adddealerAddOn(this.data.uid, this.trancForm.value['service'], this.trancForm.value['means'],
      this.trancForm.value['period'], this.trancForm.value['countries']
    )
  
    }
  


}
export const Dailog_Components = [
  Dialog1,
  Dialog2,
  Dialog3,
  Dialog4,
  DialogHeader,
  DialogTranc

]
