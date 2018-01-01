import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent, UsersComponent} from './index/index.component';
import { UserComponent } from './user/user.component';
import { DetailDealerComponent } from './detail-dealer/detail-dealer.component';
export const routes: Routes = [
   { 
    path: '', 
    component: IndexComponent,
    children: [
      {
        path: '', component: UsersComponent, pathMatch: 'full'
      },
      {
        path: 'u/0/:id', component: UserComponent, pathMatch: 'full'
      },
      {
        path: 'd/0/:id', component: DetailDealerComponent, pathMatch: 'full'
      },
      {
        path: 'd/1/:id', component: DetailDealerComponent, pathMatch: 'full'
      }
    ] 
   }
 
];

export const routing = RouterModule.forChild(routes);