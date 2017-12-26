import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyComponent } from './money.component';
import { IndexComponent } from './index.component';
import { SendComponent } from './send/send.component';
import { DetailDealerComponent } from './detail-dealer/detail-dealer.component';
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
      },
      {
        path: 'dealer/:id', component: DetailDealerComponent, pathMatch: 'full' 
      }
    ] 
   }
 
];

export const routing = RouterModule.forChild(routes);