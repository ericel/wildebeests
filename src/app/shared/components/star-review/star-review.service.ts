import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import * as moment from 'moment';
import { NotifyService } from '../../core/notify/notify.service';
export interface Star {
  createdAt: any;
  uid: any;
  reviewer: any;
  rating: number;
  review: string;
  type: string;
}
@Injectable()
export class StarReviewService {
  star: Observable<Star | null>;
  constructor(
    private afs: AngularFirestore,
    private _notify: NotifyService
  ) { 
 
  }

  addItem(authId, userId, type, review, rating){
        const data: Star = {
          createdAt: this.getCurrentTime(),
          review: review,
          rating: rating,
          type: type,
          uid: userId,
          reviewer: authId
        }
     return this.afs.collection('wi-users-reviews').add(data).then(() => {
          this._notify.update("<strong>Thanks!</strong> We Appreciate your efforts to make wildebeest better.", 'info')
     }).catch((error) => this.handleError(error) );
  }
 
    // Star reviews that belong to a user
    getAuthStars(authId) {
      const starsRef = this.afs.collection('wi-users-reviewd', ref => ref.where('userId', '==', authId) );
      return starsRef.valueChanges();
    }
    // Get all stars that belog to a Movie
    getUserStars(userId) {
      const starsRef = this.afs.collection('wi-users-reviews', ref => ref.where('uid', '==', userId) );
      return starsRef.valueChanges();
    }
    // Create or update star
    /*setStar(authId, userId, value) {
      // Star document data
      const star: Star = { authId, userId, value };
      // Custom doc ID for relationship
      const starPath = `wi-users-review/${star.authId}_${star.userId}`;
      // Set the data, return the promise
      return this.afs.doc(starPath).set(star)
    }
   */

  private handleError(error) {
    this._notify.update(error.message, 'error')
  }

  getCurrentTime(){
    return moment().format("YYYY-MM-DD HH:mm:ss"); 
  }
}