import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../shared/core/auth/authservice/auth.service';
import { Local } from './../../../../shared/core/auth/authservice/auth.model';
import { Observable } from 'rxjs/Observable';
import { LocationService } from '../../../../shared/services/location.service';
import { VotingService } from '../../../../shared/services/voting.service';
import { sum, values } from 'lodash';
@Component({
  selector: 'app-dealer-card',
  template: `

  <div class="card-header dealer-header">
    <ul class="items-dealer">
     <li class="dicplay-2 font-weight-bold">
       <a routerLink=""> <span class="online-now primary-bg blink"></span> {{dealer.displayName | ucfirst}}</a>
     </li>
     <li class="dicplay-2 font-weight-bold">
     <i class="fa fa-plus primary-text" aria-hidden="true"></i> {{positiveVoteCounts}}
    </li>
    <li class="dicplay-2 font-weight-bold">
      <i class="fa fa-minus text-danger" aria-hidden="true"></i> {{negativeVoteCounts}}
    </li>
     <li class="dicplay-2 font-weight-bold verify">
        <span class="fa fa-stack fa-lg primary-text">
            <i class="fa fa-certificate fa-stack-2x"></i>
            <i class="fa fa-check fa-stack-1x fa-inverse"></i>
        </span> Verified!
      <!--<ng-container>
        <span class="fa fa-stack fa-lg">
            <i class="fa fa-certificate fa-stack-2x" style="color: gray"></i>
            <i class="fa fa-check fa-stack-1x fa-inverse fa-slash"></i>
        </span> Not Verified!
      </ng-container>-->
     </li>
    </ul>
      <button mat-icon-button class="text-right-btn" [matMenuTriggerFor]="menuDealer"><mat-icon>keyboard_arrow_down</mat-icon></button>
  </div>
  <div class="card-block container">
    <div class="row mar-30">
      <div class="col-md-4">
          <img src="{{dealer.photoURL}}" class="dealer-img rounded " alt="Cinque Terre">
      </div>
      <div class="col-md-8">
         <ul class="no-padding dealer-details">
            <li>
                <a routerLink="" class="font-weight-bold"> {{dealer.displayName | ucfirst}}</a><br>
                <em class="text-muted">ID: {{dealer.uid}}</em><br>
                <span class="badge" [ngClass]="dealer.verified.facebook ? 'badge-info' : 'badge-danger'"><i class="fa fa-facebook-square" aria-hidden="true"></i> 
                    {{ dealer.verified.facebook ? "verified" : "not verified" }}
                </span>
                <span class="badge"  [ngClass]="dealer.verified.twitter ? 'badge-info' : 'badge-danger'"><i class="fa fa-twitter-square" aria-hidden="true"></i>
                    {{ dealer.verified.twitter ? "verified" : "not verified" }}
                </span>
                <span class="badge"  [ngClass]="dealer.verified.email ? 'badge-info' : 'badge-danger'"><i class="fa fa-envelope" aria-hidden="true"></i> 
                    {{ dealer.verified.email ? "verified" : "not verified" }}
                </span>
                <span class="badge" [ngClass]="dealer.verified.phone ? 'badge-info' : 'badge-danger'"><i class="fa fa-phone-square" aria-hidden="true"></i> 
                    {{ dealer.verified.phone ? "verified" : "not verified" }}
                </span>
            </li>
            <li>
                Available: {{dealer.updatedAt | amTimeAgo | shorten: 20:'...' | ucfirst}}.
            </li>
            <li>
                Joined Date: <span class="text-muted">{{dealer.createdAt | amDateFormat:'LL'}}</span>
            </li>
            <li>
                Country: <span class="text-muted" *ngIf="local | async as local">{{local.city}} / {{local.country}}</span>
            </li>
        </ul>
      </div>
    </div>
    <div class="container">
    <div class="text-center" *ngIf="auth.user | async as user">
         <app-voting [itemId]='dealer?.uid' [userId]='user?.uid'></app-voting>
      </div>
      <div class="text-center">
          
          <span class="badge  badge-info">10 Deals</span>
        <span class="badge  badge-info">10 Deals</span>
        <span class="badge  badge-danger">2 Bad deals</span>
      </div>
      <blockquote class="blockquote">
          <p class="mb-0">Make sure you always read dealer's terms before you deal.</p>
          <footer class="blockquote-footer">Wildebeests <cite title="Source Title">Team</cite></footer>
        </blockquote>
        <mat-tab-group class="tab-group-s" >
        <mat-tab label="Terms">
        <div class="tab-content">
        <div [innerHTML]="dealer.bio"></div>
         </div>  
       </mat-tab>
            <mat-tab label="Reviews (83)"  class="clearfix">
              <div class="row pad-10">
                <div class="col-md-2">
                    <img src="./assets/img/avatar.png" class="dealer-img-1 rounded " alt="Cinque Terre">
                </div>
                <div class="col-md-10">
                   <a routerLink="">Oj Obasi</a> 
                   <i class="fa fa-minus-circle text-danger" aria-hidden="true"></i>
                   <div class="font-italic text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
                      Phasellus volutpat neque ac dui mattis vulputate.
                   </div>
                </div>
              </div>

              <div class="row pad-10">
                  <div class="col-md-2">
                      <img src="./assets/img/avatar.png" class="dealer-img-1 rounded " alt="Cinque Terre">
                  </div>
                  <div class="col-md-10">
                     <a routerLink="">Oj Obasi</a> 
                     <i class="fa fa-check-circle primary-text" aria-hidden="true"></i>
                     <div class="font-italic text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
                        Phasellus volutpat neque ac dui mattis vulputate.
                     </div>
                  </div>
                </div>

                <div class="row pad-10">
                    <div class="col-md-2">
                        <img src="./assets/img/avatar.png" class="dealer-img-1 rounded " alt="Cinque Terre">
                    </div>
                    <div class="col-md-10">
                       <a routerLink="">Oj Obasi</a> 
                       <i class="fa fa-check-circle primary-text" aria-hidden="true"></i>
                       <div class="font-italic text-muted">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
                          Phasellus volutpat neque ac dui mattis vulputate.
                       </div>
                    </div>
                  </div>
                
                  <div class="row pad-10">
                      <div class="col-md-2">
                          <img src="./assets/img/avatar.png" class="dealer-img-1 rounded " alt="Cinque Terre">
                      </div>
                      <div class="col-md-10">
                         <a routerLink="">Oj Obasi</a> 
                         <i class="fa fa-minus-circle text-danger" aria-hidden="true"></i>
                         <div class="font-italic text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
                            Phasellus volutpat neque ac dui mattis vulputate.
                         </div>
                      </div>
                    </div>
            </mat-tab>
           
          
           <!-- <mat-tab label="Tab 5">
              No content  
            </mat-tab>
            <mat-tab label="Tab 6">
              No content  
            </mat-tab>-->
          </mat-tab-group>
    </div>

  </div>

<mat-menu #menuDealer="matMenu" xPosition="before" >
<span *ngIf="auth.user | async as user">
    <a mat-menu-item *ngIf="dealer.uid !== user.uid"><i class="fa fa-flag-o" aria-hidden="true"></i> Report User</a>
    <a mat-menu-item *ngIf="dealer.uid === user.uid" routerLink="/users/u/edit/{{dealer.uid}}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Profile</a>
    <a mat-menu-item *ngIf="dealer.uid === user.uid"><i class="fa fa-level-up" aria-hidden="true"></i> Upgrade Profile</a>
  </span>
</mat-menu> 
  `,
  styleUrls: ['./../../money/send/send.component.css', './../detail-dealer/detail-dealer.component.css']
})
export class DetailDealerCard implements OnInit, OnDestroy {
 @Input() dealer;
 userVote: number = 0;
 userVoteUp: number = 0;
 positiveVoteCounts: number;
 negativeVoteCounts: number;
 subscription;
 subscription2;
 local: Observable<Local>;
  constructor(public auth: AuthService, private _local: LocationService, private _voting: VotingService
  ) { }

  ngOnInit() {
    this.local = this._local.getUserLocal(this.dealer.uid);
    this.subscription = this._voting.getItemVotesUp(this.dealer.uid)
    .subscribe(upvotes => {
      this.positiveVoteCounts = sum(values(upvotes))
    });
    this.subscription2 = this._voting.getItemVotesDown(this.dealer.uid)
        .subscribe(downvotes => {
          this.negativeVoteCounts = sum(values(downvotes))
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
