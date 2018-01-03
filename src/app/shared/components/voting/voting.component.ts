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
  userVoteUp: number = 0;
  positiveVoteCounts: number;
  negativeVoteCounts: number;
  subscription;
  subscription2;
  constructor(private upvoteService: VotingService) { }
  ngOnInit() {
    this.subscription = this.upvoteService.getItemVotesUp(this.itemId)
                      .subscribe(upvotes => {
                        if(upvotes)
                        if (this.userId) this.userVoteUp = upvotes[this.userId]
                        this.positiveVoteCounts = sum(values(upvotes))
                      });
    this.subscription2 = this.upvoteService.getItemVotesDown(this.itemId)
                      .subscribe(downvotes => {
                        if(downvotes)
                        if (this.userId) this.userVote = downvotes[this.userId]
                        this.negativeVoteCounts = sum(values(downvotes))
    })

  }
  upvote() {
    let vote = this.userVoteUp === 1 ? 0 : 1
    let action = 'upvote'
    this.upvoteService.updateUserVote(this.itemId, this.userId, vote, action)
  }
  downvote() {
    let vote = this.userVote === -1 ? 0 : -1
    let action = 'downvote'
    this.upvoteService.updateUserVote(this.itemId, this.userId, vote, action)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
