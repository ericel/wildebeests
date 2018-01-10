import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../../shared/core/navbar/navbar.service';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { AuthService } from '../../../../shared/core/auth/authservice/auth.service';
import { User } from '../../../../shared/core/auth/authservice/auth.model';
import { Observable } from 'rxjs/Observable';
import { NotifyService } from '../../../../shared/core/notify/notify.service';
import { Local } from './../../../../shared/core/auth/authservice/auth.model';
import { LocationService } from '../../../../shared/services/location.service';
import { IsotopeOptions } from 'ngx-isotope';
import { StarReviewService } from '../../../../shared/components/star-review/star-review.service';
@Component({
  selector: 'app-detail-dealer',
  templateUrl: './detail-dealer.component.html',
  styleUrls: ['./detail-dealer.component.css']
})
export class DetailDealerComponent implements OnInit {
isValid;
deathSpinner: boolean = false;
local: Observable<Local>;
user: Observable<User>;
public gridOptions: IsotopeOptions = {
  percentPosition: true,
  itemSelector: '.grid-item',
  masonry: {
    columnWidth: '.grid-sizer'
  }
};

stars: Observable<any>;
avgRating: Observable<any>;
reviews;
  constructor(private nav: NavbarService,
    private title: Title,
    private meta: Meta,
    private router: Router,
    private spinner: SpinnerService,
    private route: ActivatedRoute,
    private notify: NotifyService,
    private _local: LocationService,
    public _auth: AuthService,
    private _star: StarReviewService,
  ) { this.spinner.hideAll();}

  ngOnInit() {
    
    this.nav.show();
    this.route.params.subscribe(params => {
    const uid = params['id'];
    this.local = this._local.getUserLocal(uid);
    this.title.setTitle('dealer beest dealer page');
      this.meta.addTags([
        { name: 'keywords', content: 'Send money to ....., dealer beest dealer page'},
        { name: 'description', content: 'Send money to...' }
      ]);
      this.user = this._auth.getUser(uid);
      this.user.subscribe(user =>{
        if(!user){
          this._auth.back();
        }
        if(!user.roles.dealer || !user.roles.dealer){
          this.spinner.show('dealerSpinner');
          this.deathSpinner = true;
          this.notify.update('<strong>Bad Route</strong>! You\'ll be redirected!', 'error');
          setTimeout(()=>{  
           this._auth.back();
          },3000);
        } 
        this.title.setTitle(user.displayName.username + ' Wildebeests profile!');
        this.meta.addTags([
          { name: 'keywords', content: user.displayName.username + ' Wildebeests profile!, '+user.roles+', send money back home, dealer'},
          { name: 'description', content: user.displayName.username + ' will help you send money back home to your love ones!' }
        ]);
      });
    
  

    this.reviews = this._star.getUsersReviews(uid)
    this._star.getUsersReviews(uid).subscribe(reviews => this.reviews = reviews)
    this.stars = this._star.getUserStars(uid)
  
      this.avgRating = this.stars.map(arr => {
        const ratings = arr.map(v => v.rating)
        var total = 0;
        for(var i = 0; i < ratings.length; i++) {
            total += ratings[i];
        }
        let avg = total / ratings.length ;
        if (isNaN(avg)) {
          return '{0}';
        }
        
        return avg;
      })
  
  });
   
  }

  deal($event){
    this.spinner.show('mySpinner');
    //this.router.navigate(['money/send/FhBtM70QZKM']);
  }
}
