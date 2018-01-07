import { Injectable } from '@angular/core';
import { Upload } from './upload.model';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirebaseApp } from 'angularfire2'; 
import { Observable } from 'rxjs/Observable';
import { NotifyService } from '../../core/notify/notify.service';
import * as moment from 'moment';
@Injectable()
export class UploadService {
  basePath = 'wi-users-uploads';
  uploadsRef: AngularFirestoreCollection<Upload>;
  uploads: Observable<Upload[]>;
  storageRef;
  constructor(
    private notify: NotifyService,
    private afs: AngularFirestore,
    private fb: FirebaseApp
  ) { 
    this.storageRef = this.fb.storage().ref();
  }

  getUploadsById(id: string) {
      const ref =  this.afs.doc<Upload>(`wi-users-uploads/${id}`);
      return ref.valueChanges();
  }

  deleteUpload(upload: Upload) {
    /*this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name);
    })
    .catch((error) => console.log(error));
    */
  }


  pushUpload(uid, upload: Upload) {
    console.log(upload);
    const uploadTask = this.storageRef.child(`${this.basePath}/${uid}/user-avatar`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        this.handleError(error)
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL && uploadTask.snapshot.state==='success') {
          console.log(uploadTask.snapshot)
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
           this.updateUserAvatar(uid, upload);
          return;
        } else {
          this.notify.update("<strong>No download URL!!</strong> upload again.", 'error')
        }
      },
    );
  }

  // Writes the file details to the realtime db
  private saveUserData(uid, upload: Upload) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users-uploads/${uid}`);
    userRef.valueChanges().subscribe(res=>{
      const data = {
        uid: uid,
        name: upload.name,
        url: upload.url,
        createdAt: this.getCurrentTime()
      }
 
      return userRef.set(data, {merge: true}).then(() =>
        this.notify.update("<strong>File Saved!</strong> Way to go.", 'info')
      ).catch((error) => this.handleError(error) );

    }).unsubscribe;
  }
 
  private updateUserAvatar(uid, upload: Upload) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wi-users/${uid}`);
    userRef.valueChanges().subscribe(res=>{
      const data = {
        photoURL: upload.url || './assets/img/avatar.png',
        updatedAt: this.getCurrentTime()
      }
 
      return userRef.update(data).then(() =>
        this.notify.update("<strong>File Saved!</strong> Way to go.", 'info')
      ).catch((error) => this.handleError(error) );

    }).unsubscribe;
  }
  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    //return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
  getCurrentTime(){
    return moment().format("YYYY-MM-DD HH:mm:ss"); 
  }
     // If error, console log and notify user
  private handleError(error) {
      this.notify.update(error.message, 'error')
 }
}
