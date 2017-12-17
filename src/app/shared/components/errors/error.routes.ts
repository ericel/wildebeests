import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  Notfound404Component } from './notfound404.component';
import {  Notfound403Component } from './notfound403.component';

export const routes: Routes = [
   { 
    path: '', 
    component: Notfound404Component,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '404' },
      { path: '404', component: Notfound404Component, pathMatch: 'full'},
      { path: '403', component: Notfound403Component, pathMatch: 'full'}
    ] 
   }
 
];

export const routing = RouterModule.forChild(routes);