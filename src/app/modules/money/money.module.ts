import { NgModule, Component } from '@angular/core';
import { routing } from './money.routes';
import { MoneyComponent } from './money.component';
import { NavbarService } from '@shared/core/navbar/navbar.service';
import { SkinModule } from '@shared/core/skin/skin.module';
import { CommonModule } from '@angular/common';
import { SendComponent } from './send/send.component';
import { IndexComponent } from './index.component';
import { SharedModule } from '@shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    CommonModule,
    SkinModule,
    routing,
    SharedModule,
    PerfectScrollbarModule
  ],
  declarations: [
    IndexComponent,
    MoneyComponent,
    SendComponent
  ],
  providers: [
  {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }
  ]
})
export class MoneyModule { }
