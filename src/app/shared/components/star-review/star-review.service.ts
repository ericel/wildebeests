import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import { NotifyService } from '../../core/notify/notify.service';
import 'rxjs/add/observable/forkJoin';
import { Actions } from '@ngrx/effects/src/actions';
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
  starsRef:  BehaviorSubject<string|null>;;
  review = {}
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

    getUsersReviews(userId) {
    let results=  [{}];
     let reviewRef = this.afs.collection('wi-users-reviews', (ref) => ref.where('uid', '==', userId))
    /* reviewRef.ref.get()
      .then((docSnaps) => {
        docSnaps.forEach((doc) => {
          results[doc.id] = doc.data();
          let USER_ID = doc.data().reviewer;
          this.afs.collection('wi-users').doc(USER_ID).ref.get().then((userDoc) => {
            results[doc.id].username = userDoc.data().displayName.username;
          });
        })
      });
     return Observable.of(results).map(() => {return results});
*/
  return  reviewRef.valueChanges()
  .switchMap(reviews => {
    let userObservables = reviews.map(status => this.afs.doc(`wi-users/${userId}`).snapshotChanges()
    );
    return Observable.combineLatest(...userObservables)
      .map((...eusers) => {
        reviews.forEach((comment, index) => {
          this.afs.collection('wi-users').doc(comment['reviewer']).ref.get().then((userDoc) => {
          comment['username'] = userDoc.data().displayName.username;
          })
        });
        return reviews;          
      });
  });
   }


  private handleError(error) {
    this._notify.update(error.message, 'error')
  }

  getCurrentTime(){
    return moment().format("YYYY-MM-DD HH:mm:ss"); 
  }
}