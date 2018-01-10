import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { SpinnerService } from '../spinner.service';
import { NotifyService } from '../../core/notify/notify.service';

@Injectable()
export class DealsService {

  constructor(
    private _afs: AngularFirestore,
    private _spinner: SpinnerService,
    private _notify: NotifyService
  ) { }

adddealerAddOn(uid, services, means, period, countries){
  const dealersRef: AngularFirestoreDocument<any> = this._afs.doc(`wi-dealers-addOn/${uid}`);
    const data = {
      uid: uid,
      services: services,
      po_means: means,
      po_countries: countries,
      po_period: period,
      createdAt: this.getCurrentTime()
    }
  return dealersRef.set(data).then(() => {
      this._notify.update("<strong>Account Name Set!</strong> Way to go.", 'info')
  }).catch((error) => this.handleError(error) );
  }
  
  getUserAddOn(uid: string){
    const ref =  this._afs.doc<any>(`wi-dealers-addOn/${uid}`);
    return ref.valueChanges();
  }
  private handleError(error) {
    this._notify.update(error.message, 'error')
  }
  getCurrentTime(){
    return moment().format("YYYY-MM-DD HH:mm:ss"); 
  }
}
