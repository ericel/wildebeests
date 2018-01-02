import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent, UsersComponent } from './index/index.component';
import { routing } from './users.routes';
import { SharedModule } from '../../../shared/shared.module';
import { DetailDealerComponent } from './detail-dealer/detail-dealer.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.module';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DetailUserComponent } from './detail-user/detail-user.component';
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
     DetailUserComponent,
     IndexComponent,
     UsersComponent,
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
