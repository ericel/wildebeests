import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from '@shared/core/navbar/navbar.service';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from '@shared/services/spinner/spinner.service';
import { AuthService } from '@shared/core/auth/authservice/auth.service';
import { User } from '@shared/core/auth/authservice/auth.model';
import { Observable } from 'rxjs/Observable';
import { NotifyService } from '@shared/core/notify/notify.service';
import { Local } from '@shared/core/auth/authservice/auth.model';
import { LocationService } from '@shared/services/location/location.service';
import { IsotopeOptions } from 'ngx-isotope';
import { StarReviewService } from '@shared/components/star-review/star-review.service';
import { DealsService } from '@shared/services/deals/deals.service';
import {UcFirstPipe} from 'ngx-pipes';
import { auth } from 'firebase';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-detail-dealer',
  templateUrl: './detail-dealer.component.html',
  styleUrls: ['./detail-dealer.component.css'],
  providers: [UcFirstPipe]
})
export class DetailDealerComponent implements OnInit, OnDestroy {
isValid;
deathSpinner: boolean = false;
local: Observable<Local>;
user: Observable<User>;
dealersInfo;
stars: Observable<any>;
avgRating: Observable<any>;
reviews;
_reviewBad;
_reviewGood;
_sub: Subscription
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
    private _dealersInfo: DealsService,
    private cFirstPipe: UcFirstPipe
  ) {

  }

  ngOnInit() {
    this.nav.show();
    this.route.params.subscribe(params => {
    const uid = params['id'];
    this.local = this._local.getUserLocal(uid);
    this.dealersInfo = this._dealersInfo.getUserAddOn(uid)
      this.user = this._auth.getUser(uid);
        this._sub = this.user.subscribe(user =>{
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
        /*this._auth.user.subscribe(auth => {
          if(uid !== auth.uid){
          // this._auth.userpageView(uid, user.view);
         }
        })*/
        
        this.title.setTitle(this.cFirstPipe.transform(user.displayName.username) + ' dealer page!');
          this.meta.addTags([
            { name: 'keywords', content: this.cFirstPipe.transform(user.displayName.username) + ' Wildebeests profile!, '+user.roles+', send money back home, dealer'},
            { name: 'description', content: this.cFirstPipe.transform(user.displayName.username) + ' will help you send money back home to your love ones!' }
          ]);
      });
    

    this.reviews = this._star.getUsersReviews(uid)
    this._sub = this._star.getUsersReviews(uid).subscribe(reviews => this.reviews = reviews)
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
  
      this._reviewGoodCount(uid);
      this._reviewBadCount(uid);
  });
   
  }

   _reviewBadCount(uid: string){ 
    this._sub = this._star.getBadReviewsCount(uid)
    .subscribe(count => {this._reviewBad = count.length
      if(this._reviewBad < 1){
        this._reviewBad = 0.5;
      }
    })
   }
  private  _reviewGoodCount(uid: string){ 
    this._sub = this._star.getGoodReviewsCount(uid)
    .subscribe(count => {this._reviewGood = count.length
      if(this._reviewGood < 1){
        this._reviewGood = 1;
      }
    })
   }

  deal($event){
    this.spinner.show('mySpinner');
    //this.router.navigate(['money/send/FhBtM70QZKM']);
  }

  ngOnDestroy(){
    this._sub.unsubscribe();
  }
}
