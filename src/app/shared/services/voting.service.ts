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

  getItemVotes(id: string): Observable<any> {
    // Gets total votes
    const ref =  this.afs.doc(`wi-users-votes/${id}`);
    return ref.valueChanges();
  }
  updateUserVote(itemId, userId, vote): void {
    if(itemId === userId){
      return this.notify.update('<strong>Come on!</strong> You Can\'t update or down vote yourself!', 'error')
    }
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users-votes/${itemId}`);
      let data = {}
      data[userId] = vote
    
    userRef.set(data, {merge:true});
  }

}
