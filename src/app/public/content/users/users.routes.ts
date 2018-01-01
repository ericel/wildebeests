import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent, UsersComponent} from './index/index.component';
import { UserComponent } from './user/user.component';
export const routes: Routes = [
   { 
    path: '', 
    component: IndexComponent,
    children: [
      {
        path: '', component: UsersComponent, pathMatch: 'full'
      },
      {
        path: 'u/0/:string', component: UserComponent, pathMatch: 'full'
      }
    ] 
   }
 
];

export const routing = RouterModule.forChild(routes);