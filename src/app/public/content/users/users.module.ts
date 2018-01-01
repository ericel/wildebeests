import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { IndexComponent, UsersComponent } from './index/index.component';
import { routing } from './users.routes';
import { SharedModule } from '../../../shared/shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DetailDealerComponent } from './detail-dealer/detail-dealer.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.module';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    PerfectScrollbarModule
  ],
  declarations: [
    UserComponent,
     IndexComponent,
     UsersComponent,
     UserDetailComponent,
     DetailDealerComponent
    ],
providers:  [
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }
    ]
})
export class UsersModule { }
