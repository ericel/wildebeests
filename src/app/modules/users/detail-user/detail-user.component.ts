import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from '@shared/core/navbar/navbar.service';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from '@shared/services/spinner/spinner.service';
import { AuthService } from '@shared/core/auth/authservice/auth.service';
import { User } from '@shared/core/auth/authservice/auth.model';
import { Observable } from 'rxjs/Observable';
import { NotifyService } from '@shared/core/notify/notify.service';

@Component({
  selector: 'app-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit, OnDestroy {
  deathSpinner: boolean = false;
  user: Observable<User>;
  constructor(private nav: NavbarService,
    private title: Title,
    private meta: Meta,
    private router: Router,
    private spinner: SpinnerService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.nav.show();
    this.route.params.subscribe(params => {
    const uid = params['id'];
      this.user = this.auth.getUser(uid);
      this.user.subscribe(user =>{
        if(!user){
          this.auth.back();
        }
        if(!user.roles.user || user.roles.dealer || user.roles.admin){
          this.spinner.show('dealerSpinner');
          this.deathSpinner = true;
          this.notify.update('<strong>Bad Route</strong>! You\'ll be redirected!', 'error');
          setTimeout(()=>{  
           this.auth.back();
          },3000);
        } 

        this.title.setTitle(user.displayName.username + ' Wildebeests profile!');
        this.meta.addTags([
        { name: 'keywords', content: user.displayName.username + ' Wildebeests profile!'},
        { name: 'description', content: user.displayName.username + ' Wildebeests profile!' }
      ]);
      });
    });
  }

  ngOnDestroy(){
    
  }

}
