import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/delay';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as actions from './blogs.actions';
import * as fromBlog from './blogs.reducer';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class BlogsEffects {

  // Listen for the 'QUERY' action, must be the first effect you trigger
  @Effect() query$: Observable<Action> = this.actions$.ofType(actions.QUERY)
    .switchMap(action => {
        const ref = this.afs.collection<fromBlog.Blog>('wi-blogs')
        return ref.snapshotChanges().map(arr => { 
            return arr.map( doc => { 
                const data = doc.payload.doc.data()
                return { id: doc.payload.doc.id, ...data } as fromBlog.Blog
            })
        })
    })
    .map(arr => { 
        console.log(arr)
        return new actions.AddAll(arr)
    })
    
    // Listen for the 'CREATE' action
    @Effect() create$: Observable<Action> = this.actions$.ofType(actions.CREATE)
        .map((action: actions.Create) => action.blog )
        .switchMap(blog => {
            const ref = this.afs.doc<fromBlog.Blog>(`wi-blogs/${blog.id}`)
            return Observable.fromPromise( ref.set(blog) )
        })
        .map(() => {
            return new actions.Success()
        })
    
    // Listen for the 'UPDATE' action
    @Effect() update$: Observable<Action> = this.actions$.ofType(actions.UPDATE)
        .map((action: actions.Update) => action)
        .delay(2000) // delay to show loading spinner, delete me!
        .switchMap(data => {
            const ref = this.afs.doc<fromBlog.Blog>(`wi-blogs/${data.id}`)
            return Observable.fromPromise( ref.update(data.changes) )
        })
        .map(() => {
            return new actions.Success()
        })

    // Listen for the 'DELETE' action   
    
    @Effect() delete$: Observable<Action> = this.actions$.ofType(actions.DELETE)
        .map((action: actions.Delete) => action.id )
        .switchMap(id => {
            const ref = this.afs.doc<fromBlog.Blog>(`wi-blogs/${id}`)
            return Observable.fromPromise( ref.delete() )
        })
        .map(() => {
            return new actions.Success()
        })
    
    constructor(private actions$: Actions, private afs: AngularFirestore) { }    
}