import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { NotifyService } from '../core/notify/notify.service';
import { merge } from 'rxjs/observable/merge';
@Injectable()
export class VotingService {

  constructor(private afs: AngularFirestore,
   private notify: NotifyService
  ) { }

  getItemVotesUp(id: string): Observable<any> {
    // Gets total votes
    const ref =  this.afs.doc(`wi-users-votes-up/${id}`);
    return ref.valueChanges();
  }
  getItemVotesDown(id: string): Observable<any> {
    // Gets total votes
    const ref =  this.afs.doc(`wi-users-votes-down/${id}`);
    return ref.valueChanges();
  }
  updateUserVote(itemId, userId, vote, action): void {
    if(itemId === userId){
      return this.notify.update('<strong>Come on!</strong> You Can\'t update or down vote yourself!', 'error')
    }
    if(action === "upvote"){
       this.upVote(action, vote, userId, itemId);
       this.downVote('downvote', 0, userId, itemId);
    }

    if(action === "downvote"){
      this.downVote(action, vote, userId, itemId);
      this.upVote('upvote', 0, userId, itemId);
    }
   
  }
  private downVote(action, vote, userId, itemId){
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users-votes-down/${itemId}`);
        let data = {}
        data[userId] = vote
      
       userRef.set(data, {merge:true});
  }
  private upVote(action, vote, userId, itemId){
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users-votes-up/${itemId}`);
        let data = {}
        data[userId] = vote
      
       userRef.set(data, {merge:true});
  }
}
