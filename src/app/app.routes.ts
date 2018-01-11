import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { AuthGuard } from './shared/core/auth/authguard/auth.guard';
import { LoginComponent } from './shared/components/signup/signup.component';
import { SearchComponent, SearchMobileComponent } from './public/search/search.component'
export const routes: Routes = [
   {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
   path: 'about',
   component: AboutComponent,
   pathMatch: 'full'
   
  },
  {
   path: 'search',
   component: SearchComponent,
   pathMatch: 'full'
   
  },
  {
   path: 'search/mobile',
   component: SearchMobileComponent,
   pathMatch: 'full'
   
  },
  {
   path: 'login',
   component: LoginComponent,
   pathMatch: 'full'
  },
  { path: 'content', loadChildren: './modules/blogs/blogs.module#BlogsModule'},
  { path: 'users', loadChildren: './modules/users/users.module#UsersModule'},
  { path: 'money', loadChildren: './modules/money/money.module#MoneyModule'},
  { path: 'error/403', loadChildren: './shared/components/errors/errors.module#ErrorsModule'},
  { path: 'error', loadChildren: './shared/components/errors/errors.module#ErrorsModule'},
  { path: '**', redirectTo: 'error'}
];
export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);