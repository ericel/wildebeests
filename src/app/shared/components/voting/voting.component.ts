import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { VotingService } from '../../services/voting.service';
import { sum, values } from 'lodash';
@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit, OnDestroy {

  @Input() userId;
  @Input() itemId;
  voteCount: number = 0;
  userVote: number = 0;
  subscription;
  constructor(private upvoteService: VotingService) { }
  ngOnInit() {
    this.subscription = this.upvoteService.getItemVotes(this.itemId)
                      .subscribe(upvotes => {
                        if (this.userId) this.userVote = upvotes[this.userId]
                        this.voteCount = sum(values(upvotes))
                      })
  }
  upvote() {
    let vote = this.userVote === 1 ? 0 : 1
    this.upvoteService.updateUserVote(this.itemId, this.userId, vote)
  }
  downvote() {
    let vote = this.userVote === -1 ? 0 : -1
    this.upvoteService.updateUserVote(this.itemId, this.userId, vote)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
