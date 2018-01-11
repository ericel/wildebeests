import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { NotifyService } from './../../notify/notify.service';
import { User, Local } from './auth.model';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { SpinnerService } from '../../../services/spinner.service';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { LocationService } from '../../../services/location.service';
@Injectable()
export class AuthService {
  user: Observable<User | null>;
  usersCollection: AngularFirestoreCollection<User>;
  userId: string; // current user uid
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService,
              private spinner: SpinnerService,
              private location: Location,
              private _locationService: LocationService
            ) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`wi-users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
      
     this.usersCollection = this.afs.collection('wi-users', (ref) => ref.orderBy('updatedAt', 'desc').limit(5));
    
  }

    // Return a single observable User
    getUser(id: string) {
      const ref =  this.afs.doc<User>(`wi-users/${id}`);
      return ref.valueChanges();
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

  //Update page Viiew 
  userpageView(uid, view){
    const viewcount = view + 1;
    const data = {
      view: viewcount
    }
   return this.afs.doc(`wi-users/${uid}`).update(data);
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
        email: user.email,
        displayName: {
          fullname: user.displayName || user.email.split('@')[0],
          editCount:0,
          username: user.displayName || user.email.split('@')[0]
        },
        photoURL: user.photoURL || 'https://wilde-beests.firebaseapp.com/assets/img/avatar.png',
        createdAt: this.getCurrentTime(),
        updatedAt: this.getCurrentTime(),
        view: 0,
        roles: {
          user: true,
          dealer: false,
          admin: false,
        },
        verified: {
          links:{
            facebook: 'Enter your facebook profile url',
            twitter: 'Enter your twitter profile url',
            email: user.email || 'Enter your email address',
            phone: 'Enter your phone number'
          },
          facebook: false,
          twitter: false,
          email: true,
          phone: false
        },
        status: 'online',
        bio: 'I\'m a wildebeests! More about me to be added. <p class="text-danger">Incomplete profile! Profile needs more information.</p>',
        
      }
      this._Local_User(user);
      return userRef.set(data, {merge: true}).then(() =>
        this.update_localto_user(user)
      ).catch((error) => this.handleError(error) );

    }
    }).unsubscribe;
   this.spinner.hideAll();
   this.back();
  }
  private update_localto_user(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users/${user.uid}`);
    const local = this._locationService.getCurrentIpLocation().subscribe(local => {
      const data = {
        contactInfo: {
          country: local.country || 'Country needed!',
          city: local.city || 'City needed!',
          region: local.region || 'State, Province needed!',
          lat_long: local.loc || 'Latitude and Longitude needed!',
          internetOrg: local.org
        }
      }
    return userRef.update(data).then(() => {
      }).catch((error) => this.handleError(error) );
  }).unsubscribe;
  }
  private _Local_User(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users-local/${user.uid}`);
    const local = this._locationService.getCurrentIpLocation().subscribe(local => {
      const data: Local = {
        uid: user.uid,
        country: local.country || 'Country needed!',
        city: local.city || 'City needed!',
        ip: local.ip || 'Location Ip needed!',
        region: local.region || 'State, Province needed!',
        lat_long: local.loc || 'Latitude and Longitude needed!',
        internetOrg: local.org
      }
    return userRef.set(data, {merge: true}).then(() => {
      
      }).catch((error) => this.handleError(error) );
  }).unsubscribe;
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.back();
    });
  }

    // If error, console log and notify user
  private handleError(error) {
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
  return moment().format("YYYY-MM-DD HH:mm:ss"); 
}

//Update user data
updateBio(uid, bio){
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users/${uid}`);

    const data = {
      updatedAt: this.getCurrentTime(),
      bio: bio
    }
    return userRef.update(data).then(() => {
      this.notify.update("<strong>User Saved!</strong> Way to go.", 'info')
      }).catch((error) => this.handleError(error) );

}

updateContactInfo(uid, address, city, country){
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users/${uid}`);

      const data = {
        updatedAt: this.getCurrentTime(),
        contactInfo: {
          region: address,
          city: city,
          country: country
        }
      }
      return userRef.update(data).then(() => {
      this.notify.update("<strong>User Saved!</strong> Way to go.", 'info')
      }).catch((error) => this.handleError(error) );

}

updateVerifiedLinks(uid, facebook, twitter, email, phone){
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users/${uid}`);
  if (/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(facebook)){
     var verifyFacebook = true;
  } else {
    var verifyFacebook = false;
  }
  if (/^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/i.test(twitter)){
    var verifyTwitter = true;
 } else {
  var verifyTwitter = false;
 }

    const data = {
      email: email,
      updatedAt: this.getCurrentTime(),
      "verified.links.facebook": facebook,
      "verified.links.twitter": twitter,
      "verified.links.email": email,
      "verified.links.phone": phone,
      "verified.facebook": verifyFacebook,
      "verified.twitter": verifyTwitter
    }
    return userRef.update(data).then(() => {
    this.notify.update("<strong>Social Links Saved!</strong> Way to go.", 'info')
    }).catch((error) => this.handleError(error) );


}
updateUsername(uid, username, fullname, count){
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users/${uid}`);
  if (count > 0){
    this.notify.update("<strong>This property can't be change anymore!</strong> Way to go.", 'error')
    return
  }
    const data = {
      displayName: {
        fullname: fullname,
        editCount:1,
        username: username
      },
      updatedAt: this.getCurrentTime()
    }
    return userRef.update(data).then(() => {
    this.notify.update("<strong>Account Name Set!</strong> Way to go.", 'info')
    }).catch((error) => this.handleError(error) );
  } 


}