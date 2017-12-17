import { Injectable, Inject } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/pluck';

@Injectable()
export class NavbarService {
  visible: boolean;
  width$: Observable<number>;
  height$: Observable<number>;
  constructor() {  
    this.visible = false;

   
  
      let windowSize$ = createWindowSize$();
      this.width$ = (windowSize$.pluck('width') as Observable<number>).distinctUntilChanged();
      this.height$ = (windowSize$.pluck('height') as Observable<number>).distinctUntilChanged();
  
  
  }
  hide() { this.visible = false; }
  
  show() { this.visible = true; }
  
  toggle() { this.visible = !this.visible; }

  doSomethingElseUseful() { }
}

const createWindowSize$ = () =>
Observable.fromEvent(window, 'resize')
  .map(getWindowSize)
  .startWith(getWindowSize())
  .publishReplay(1)
  .refCount();

const getWindowSize = () => {

    return {
      height: window.innerHeight,
      width: window.innerWidth
    }

};