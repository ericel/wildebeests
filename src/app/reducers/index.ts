import { ActionReducerMap } from '@ngrx/store';
import { pizzaReducer } from './../pizza/pizza.reducer';
import { blogReducer } from '../public/content/blogs/state/blogs.reducer';
import { userReducer } from '../shared/core/auth/state/auth.reducer';
export const reducers: ActionReducerMap<any> = {
    pizza: pizzaReducer,
    blog: blogReducer,
    user: userReducer
};