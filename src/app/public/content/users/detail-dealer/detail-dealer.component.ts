import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../../shared/core/navbar/navbar.service';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { AuthService } from '../../../../shared/core/auth/authservice/auth.service';
import { User } from '../../../../shared/core/auth/authservice/auth.model';
import { Observable } from 'rxjs/Observable';
import { NotifyService } from '../../../../shared/core/notify/notify.service';
@Component({
  selector: 'app-detail-dealer',
  templateUrl: './detail-dealer.component.html',
  styleUrls: ['./detail-dealer.component.css']
})
export class DetailDealerComponent implements OnInit {
isValid;
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
    
  ) { this.spinner.hideAll();}

  ngOnInit() {
    
    this.nav.show();
    this.route.params.subscribe(params => {
    const uid = params['id'];
    this.title.setTitle('dealer beest dealer page');
      this.meta.addTags([
        { name: 'keywords', content: 'Send money to ....., dealer beest dealer page'},
        { name: 'description', content: 'Send money to...' }
      ]);
      this.user = this.auth.getUser(uid);
      this.user.subscribe(user =>{
        if(!user.roles.dealer || !user.roles.dealer){
          this.spinner.show('dealerSpinner');
          this.deathSpinner = true;
          this.notify.update('<strong>Bad Route</strong>! You\'ll be redirected!', 'error');
          setTimeout(()=>{  
           this.auth.back();
          },3000);
        } 
      });
    });
  }

  deal($event){
    this.spinner.show('mySpinner');
    //this.router.navigate(['money/send/FhBtM70QZKM']);
  }
}
