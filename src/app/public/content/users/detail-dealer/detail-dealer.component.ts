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
import { DealsService } from '../../../../shared/services/deals/deals.service';
import {UcFirstPipe} from 'ngx-pipes';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-detail-dealer',
  templateUrl: './detail-dealer.component.html',
  styleUrls: ['./detail-dealer.component.css'],
  providers: [UcFirstPipe]
})
export class DetailDealerComponent implements OnInit {
isValid;
deathSpinner: boolean = false;
local: Observable<Local>;
user: Observable<User>;
dealersInfo;
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
options: object;
chartData =  [{
  name: 'IE',
  y: 56.33
}, {
  name: 'Chrome',
  y: 24.03,
  sliced: true,
  selected: true
}, {
  name: 'Firefox',
  y: 10.38
}, {
  name: 'Safari',
  y: 4.77
}, {
  name: 'Opera',
  y: 0.91
}, {
  name: 'Other',
  y: 0.2
}]
//chartData: Observable<any>
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
        this.title.setTitle(this.cFirstPipe.transform(user.displayName.username) + ' dealer page!');
        this.meta.addTags([
          { name: 'keywords', content: this.cFirstPipe.transform(user.displayName.username) + ' Wildebeests profile!, '+user.roles+', send money back home, dealer'},
          { name: 'description', content: this.cFirstPipe.transform(user.displayName.username) + ' will help you send money back home to your love ones!' }
        ]);
      });
    
  
      this.options = {chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'area'
            },title: {
                text: 'Browser market shares January, 2015 to May, 2015'
            },tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },series: [{
                data: this.chartData
        }, {
          name: 'USSR/Russia',
          data: [null, null, null, null, null, null, null, null, null, null,
              5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
              4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
              15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
              33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
              35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
              21000, 20000, 19000, 18000, 18000, 17000, 16000]
      }]
    };


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
