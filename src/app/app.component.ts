import { Component, HostListener } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shakedown';
  items: Observable<any[]>;
  constructor(db: AngularFirestore){
    this.items = db.collection('posts').valueChanges();
    
  }
}
