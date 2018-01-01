import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyComponent } from './money.component';
import { IndexComponent } from './index.component';
import { SendComponent } from './send/send.component';
export const routes: Routes = [
   { 
    path: '', 
    component: IndexComponent,
    children: [
      {
        path: '', component: MoneyComponent, pathMatch: 'full'
      },
      {
        path: 'send/:id', component: SendComponent, pathMatch: 'full' 
      }
    ] 
   }
 
];

export const routing = RouterModule.forChild(routes);