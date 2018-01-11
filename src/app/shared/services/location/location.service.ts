import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { NotifyService } from '@shared/core/notify/notify.service';
import { Local } from '@shared/core/auth/authservice/auth.model';
import { AngularFirestore } from 'angularfire2/firestore';
@Injectable()
export class LocationService {

  constructor(
    private _http: Http,
    private notify: NotifyService,
    private afs: AngularFirestore,
  ) { }
  getCurrentIpLocation(): Observable<any> {
    return this._http.get('http://ipinfo.io')
    .map(response => response.json())
    .catch(error => {
        console.log(error);
        this.notify.update(error, 'error')
        return Observable.throw(error.json());
    });
}

 // Return a single observable User
getUserLocal(id: string) {
  const ref =  this.afs.doc<Local>(`wi-users-local/${id}`);
  return ref.valueChanges();
}
}
