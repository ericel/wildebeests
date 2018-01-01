import { NgModule, Component } from '@angular/core';
import { routing } from './money.routes';
import { MoneyComponent } from './money.component';
import { NavbarService } from '../../../shared/core/navbar/navbar.service';
import { SkinModule } from '../../../shared/core/skin/skin.module';
import { CommonModule } from '@angular/common';
import { SendComponent } from './send/send.component';
import { IndexComponent } from './index.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SkinModule,
    routing,
    SharedModule
  ],
  declarations: [
    IndexComponent,
    MoneyComponent,
    SendComponent
  ]
})
export class MoneyModule { }
