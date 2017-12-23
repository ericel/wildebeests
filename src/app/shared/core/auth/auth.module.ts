import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as moment from 'moment';
import { MomentModule } from 'angular2-moment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './state/auth.reducer';
import { UserEffects } from './state/auth.effects';
import { AuthComponent } from './auth.component';
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [
    AuthComponent
  ],
  exports: [
      AuthComponent
  ]
})
export class AuthModule { }