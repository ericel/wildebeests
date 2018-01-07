import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
export interface Star {
  authId: any;
  userId: any;
  value: number;
}
@Injectable()
export class StarReviewService {
  constructor(private afs: AngularFirestore) { }
  // Star reviews that belong to a user
  getAuthStars(authId) {
    const starsRef = this.afs.collection('wi-users-review', ref => ref.where('userId', '==', authId) );
    return starsRef.valueChanges();
  }
  // Get all stars that belog to a Movie
  getUserStars(userId) {
    const starsRef = this.afs.collection('wi-users-review', ref => ref.where('userId', '==', userId) );
    return starsRef.valueChanges();
  }
  // Create or update star
  setStar(authId, userId, value) {
    // Star document data
    const star: Star = { authId, userId, value };
    // Custom doc ID for relationship
    const starPath = `wi-users-review/${star.authId}_${star.userId}`;
    // Set the data, return the promise
    return this.afs.doc(starPath).set(star)
  }
}