import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkinModule } from './skin/skin.module';
import { AuthService } from './auth/authservice/auth.service';
import { AuthGuard } from './auth/authguard/auth.guard';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotifyService } from './notify/notify.service';
import { NavbarService } from './navbar/navbar.service';
@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    SkinModule
  ],
  declarations: [],
  providers: [AuthService, AuthGuard, NotifyService, NavbarService]
})
export class CoreModule { }
