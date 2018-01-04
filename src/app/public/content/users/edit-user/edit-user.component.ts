import { Component, OnInit, Inject, ElementRef, ViewChild, } from '@angular/core';
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
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators,  } from '@angular/forms';
import {AbstractControl} from '@angular/forms';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: Observable<User>;
  deathSpinner: boolean = false;
  local: Observable<Local>;
  _auth;
  user$;
  constructor(private nav: NavbarService,
   private auth: AuthService,
   private spinner: SpinnerService,
   private title: Title,
   private meta: Meta,
   private router: Router,
   private route: ActivatedRoute,
   private notify: NotifyService,
   private _local: LocationService,
   public dialog: MatDialog
  ) { 

    

  }

  ngOnInit() {
    this.nav.show();
    this.auth.user.subscribe(auth => {if(auth)
    this.local = this._local.getUserLocal(auth.uid);
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
  
          this.title.setTitle(user.displayName + ' Edit Wildebeests profile!');
          this.meta.addTags([
          { name: 'keywords', content: user.displayName + ' Edit Wildebeests profile!'},
          { name: 'description', content: user.displayName + ' Edit Wildebeests profile!' }
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
       <small class="text-muted"><em [innerHTML]="notifyText"></em></small>
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
  public fb: FormBuilder, private auth: AuthService
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
    //this.notifyText = '<span class="text-danger">Blog needs more content!</span>';
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

export const Dailog_Components = [
  Dialog1
]
