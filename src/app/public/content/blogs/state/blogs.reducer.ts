import * as actions from './blogs.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Main data interface
export interface Blog {
    id: string;
    title: string;
    section: string;
    blog: string;
    createddAt: string;
    updatedAt: string;
    uid: string;
    username: string;
    blogImg: string;
    size: string;
    loading?:    boolean;
}

// Entity adapter
export const blogAdapter = createEntityAdapter<Blog>();
export interface State extends EntityState<Blog> { }


// Default data / initial state
const defaultBlog = {
    ids: ['123'],
    entities: {
        '123': {
            id: '123',
            blog: 'Wildebeests Blogs',
            size: 'small'
        }
    }
}

export const initialState: State = blogAdapter.getInitialState();

// Reducer
export function blogReducer(
    state: State = initialState,
    action: actions.BlogsActions) {

    switch (action.type) {

        case actions.ADD_ALL:
            return blogAdapter.addAll(action.blog, state);

        default:
            return state;
        }

}

// Create the default selectors
export const getBlogState = createFeatureSelector<State>('blog');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = blogAdapter.getSelectors(getBlogState);