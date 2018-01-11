import { Action } from '@ngrx/store';
import { Blog }  from './blogs.reducer';

export const CREATE     = '[Blogs] Create'
export const UPDATE     = '[Blogs] Update'
export const DELETE     = '[Blogs] Delete'

export const QUERY      = '[Blogs] Query'
export const ADD_ALL    = '[Blogs] Add All'
export const SUCCESS    = '[Blogs] Successful firestore write'

export class Query implements Action {
    readonly type = QUERY;
    constructor() { }
}

export class AddAll implements Action {
    readonly type = ADD_ALL;
    constructor(public blog: Blog[]) { }
}

export class Success implements Action {
    readonly type = SUCCESS;
    constructor() { }
}


export class Create implements Action {
    readonly type = CREATE;
    constructor(public blog: Blog) { }
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: string,
        public changes: Partial<Blog>,
      ) { }
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: string) { }
}

export class Get_blog implements Action {
    readonly type = QUERY;
    constructor(public id: string) { }
}
export type BlogsActions
= Create
| Update
| Delete
| Query
| Get_blog
| AddAll;