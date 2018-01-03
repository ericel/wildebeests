import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../../shared/core/auth/authservice/auth.service';
import { LocationService } from '../../../../../shared/services/location.service';
import { Observable } from 'rxjs/Observable';
import { Local } from './../../../../../shared/core/auth/authservice/auth.model';
import { VotingService } from '../../../../../shared/services/voting.service';
import { sum, values } from 'lodash';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./../../../money/send/send.component.css']
})
export class UserDetailCard implements OnInit, OnDestroy {
  @Input() user0;
  userVote: number = 0;
  userVoteUp: number = 0;
  positiveVoteCounts: number;
  negativeVoteCounts: number;
  subscription;
  subscription2;
  local: Observable<Local>;
  constructor(public auth: AuthService, 
    private _local: LocationService,
    private _voting: VotingService
  ) { }

  ngOnInit() {
    this.local = this._local.getUserLocal(this.user0.uid);
    this.subscription = this._voting.getItemVotesUp(this.user0.uid)
    .subscribe(upvotes => {
      this.positiveVoteCounts = sum(values(upvotes))
    });
    this.subscription2 = this._voting.getItemVotesDown(this.user0.uid)
        .subscribe(downvotes => {
          this.negativeVoteCounts = sum(values(downvotes))
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
