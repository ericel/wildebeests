import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, docChanges } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import { NotifyService } from '../../core/notify/notify.service';
import 'rxjs/add/observable/forkJoin';

export interface Star {
  $key: string;
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
      let key = this.afs.createId()
      let ref = this.afs.doc(`wi-users-reviews/${key}`);
        const data: Star = {
          $key: key,
          createdAt: this.getCurrentTime(),
          review: review,
          rating: rating,
          type: type,
          uid: userId,
          reviewer: authId
        }
     return ref.set(data).then(() => {
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
  let reviewRef = this.afs.collection('wi-users-reviews', (ref) => ref.orderBy('createdAt', 'desc').where('uid', '==', userId) )
  return  reviewRef.valueChanges()
  .switchMap(reviews => {
    let userObservables = reviews.map(status => this.afs.doc(`wi-users/${userId}`).snapshotChanges()
    );
    return Observable.combineLatest(...userObservables)
      .map((...eusers) => {
        reviews.forEach((review, index) => {
          this.afs.collection('wi-users').doc(review['reviewer']).ref.get().then((userDoc) => {
          review['username'] = userDoc.data().displayName.username;
          review['photoURL'] = userDoc.data().photoURL;
          review['admin'] = userDoc.data().roles.admin;
          review['dealer'] = userDoc.data().roles.dealer;
          review['user'] = userDoc.data().roles.user;
          })
        });
        return reviews;          
      });
  });
   }

   getBadReviewsCount(userId): Observable<any> {
    const ref = this.afs.collection('wi-users-reviews', ref => ref.where('uid', '==', userId).where('type', '==', 'Bad') );
    return ref.valueChanges();
   }
   getGoodReviewsCount(userId): Observable<any> {
    return this.afs.collection('wi-users-reviews', ref => ref.where('uid', '==', userId).where('type', '==', 'Good') )
    .valueChanges();
  }

   delete(review){
     this.afs.doc(`wi-users-reviews/${review}`).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
   }

  private handleError(error) {
    this._notify.update(error.message, 'error')
  }

  getCurrentTime(){
    return moment().format("YYYY-MM-DD HH:mm:ss"); 
  }
}