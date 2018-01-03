import { Component, OnInit } from '@angular/core';
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

}
