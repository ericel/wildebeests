import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/core/auth/authguard/auth.guard';
import { IndexComponent, UsersComponent } from './index/index.component';
 
export const routes: Routes = [
   { 
    path: '', 
    component: IndexComponent,
    children: [
      {
        path: '', component: UsersComponent, pathMatch: 'full'
      }
    ] 
   }
 
];

export const routing = RouterModule.forChild(routes);
