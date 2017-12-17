import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { NotifyService } from './../../notify/notify.service';
interface User {
  uid: string;
  username: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  createdAt?: string;
  updatedAt?: string;
  catchPhrase?: string;
}
@Injectable()
export class AuthService {
  user: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
            private notify: NotifyService) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
  }
  //// Email/Password Auth ////
  
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.updateUserData(user)
        //return this.setUserDoc(user) // create initial user document
      })
      .catch(error => this.handleError(error) );
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }
   // Update properties on the user document
   updateUser(user: User, data: any) { 
    return this.afs.doc(`users/${user.uid}`).update(data)
  }
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wusers/${user.uid}`);
    const data: User = {
      uid: user.uid,
      username: user.displayName.replace(/[\s]/g, '.'),
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: "9939",
      updatedAt: "93939"
    }
    return userRef.set(data)
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

    // If error, console log and notify user
  private handleError(error) {
      console.error(error)
      this.notify.update(error.message, 'error')
 }
}