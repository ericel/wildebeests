import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent, UsersComponent} from './index/index.component';

import { DetailDealerComponent } from './detail-dealer/detail-dealer.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AuthGuard } from '../../../shared/core/auth/authguard/auth.guard';
import { UpgradePlanComponent } from './upgrade-plan/upgrade-plan.component';
export const routes: Routes = [
   { 
    path: '', 
    component: IndexComponent,
    children: [
      {
        path: '', component: UsersComponent, pathMatch: 'full'
      },
      {
        path: 'u/0/:id', component: DetailUserComponent, pathMatch: 'full'
      },
      {
        path: 'd/0/:id', component: DetailDealerComponent, pathMatch: 'full'
      },
      {
        path: 'd/1/:id', component: DetailDealerComponent, pathMatch: 'full'
      },
      {
        path: 'u/edit/:id', component: EditUserComponent, pathMatch: 'full', canActivate: [AuthGuard]
      },
      {
        path: 'upgrade-plan', component: UpgradePlanComponent, pathMatch: 'full', canActivate: [AuthGuard]
      }
    ] 
   }
 
];

export const routing = RouterModule.forChild(routes);