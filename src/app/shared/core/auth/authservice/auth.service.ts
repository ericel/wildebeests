import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { NotifyService } from './../../notify/notify.service';
import { User } from './auth.model';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { SpinnerService } from '../../../services/spinner.service';
import { Location } from '@angular/common';
import * as moment from 'moment';
@Injectable()
export class AuthService {
  user: Observable<User | null>;
  usersCollection: AngularFirestoreCollection<User>;
  userId: string; // current user uid
  timestamp = firebase.firestore.FieldValue.serverTimestamp();
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService,
              private spinner: SpinnerService,
              private location: Location
            ) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
           // this.updateOnConnect();
            //this.userId = user.uid
            return this.afs.doc<User>(`wi-users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })

     this.usersCollection = this.afs.collection('wi-users', (ref) => ref.orderBy('updatedAt', 'desc').limit(5));
  }

  getSnapshot(): Observable<User[]> {
    // ['added', 'modified', 'removed']
    return this.usersCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }
 /* check User Status */
  /// Helper to perform the update in Firebase
  private updateStatus(status: string) {
    if (!this.userId) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users/${this.userId}`);
    const data = {
      status: status
    }
    return userRef.update(data)
  }
  }
  /// Updates status when connection to Firebase starts
  /*private updateOnConnect() {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users/${this.userId}`);
    return this.afs.object('.info/connected')
    .do(connected => {
        let status = connected.$value ? 'online' : 'offline'
        this.updateStatus(status)
    })
    .subscribe()
  }*/
/* END CHECK USER STATUS */
  googleLogin() {
    this.spinner.show('mySpinnerg');
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    this.spinner.show('mySpinnerf');
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to wildebeests!!!', 'success');
        this.updateUserData(credential.user)
      })
      .catch((error) => this.handleError(error) );
  }
   // Update properties on the user document
  updateUser(user: User, data: any) { 
    return this.afs.doc(`users/${user.uid}`).update(data)
  }

  //// Email/Password Auth ////
   emailSignUp(email: string, password: string) {
    this.spinner.show('mySpinners');
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    this.spinner.show('mySpinnerl');
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users/${user.uid}`);
    userRef.valueChanges().subscribe(res=>{
    if(res){
      const data = {
        updatedAt: this.getCurrentTime(),
        status: 'online'
      }
      return userRef.update(data);
    } else {
      const data: User = {
        uid: user.uid,
        username: user.displayName || user.email.split('@')[0],
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || 'https://wilde-beests.firebaseapp.com/assets/img/avatar.png',
        createdAt: this.getCurrentTime(),
        updatedAt: this.getCurrentTime(),
        roles: {
          user: true,
          dealer: false,
          contentcreator: false,
          admin: false,
        },
        status: 'online'
      }
      return userRef.set(data, {merge: true})
    }
    });
   this.spinner.hideAll();
   this.back();
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.back();
    });
  }

    // If error, console log and notify user
  private handleError(error) {
      console.error(error)
      this.notify.update(error.message, 'error')
 }


  ///// Role-based Authorization //////
  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }
  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }
  canDelete(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }
  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true
      }
    }
    return false
  }

back() {
      if(this.router.url == '/')
        this.router.navigate(['/']);
      else
        this.location.back();
}
getCurrentTime(){
  return moment().format('DD MMM YYYY HH:mm:ss'); 
}
}