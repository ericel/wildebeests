import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkinModule } from './core/skin/skin.module';
import { NavbarComponent, NavbarDownComponent, NavbarMobileComponent } from './components/navbar/navbar.component';
import { SignupComponent, LoginComponent, MainintoComponent } from './components/signup/signup.component';
import { WysiwygComponent } from '../public/content/blogs/shared/wysiwyg/wysiwyg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogcardComponent } from '../public/content/blogs/shared/blogcard/blogcard.component';
import { LoadingWait } from './components/errors/notfound404.component';
import { NgPipesModule } from 'ngx-pipes';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponent } from './components/shared/shared.component';
import { MomentModule } from 'angular2-moment';
import { NotifyComponent, Dialog_COMPONENTS } from './components/notify/notify.component';
import { ADS_COMPONENTS } from './components/ads-right/ads-right.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerService } from './services/spinner.service';
import { DetailDealerCard } from '../public/content/users/shared/dealer-card';
import { UserCardComponent } from '../public/content/users/shared/user-card/user-card.component';
import * as Ps from 'perfect-scrollbar'


export const SHARED_COMPONENTS = [
  NavbarComponent,
  NavbarDownComponent,
  NavbarMobileComponent,
  SignupComponent,
  LoginComponent,
  MainintoComponent
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SkinModule,
    NgPipesModule,
    MomentModule,
    FlexLayoutModule
  ],
  declarations: [
    WysiwygComponent,
    BlogcardComponent,
    LoadingWait,
    SharedComponent,
    NotifyComponent,
    DetailDealerCard,
    ...Dialog_COMPONENTS,
    ...ADS_COMPONENTS,
    UserCardComponent
  ],
  exports: [
   WysiwygComponent,
   BlogcardComponent,
   LoadingWait,
   SharedComponent,
   NotifyComponent,
   DetailDealerCard,
   ...ADS_COMPONENTS,
   ...Dialog_COMPONENTS,
   NgPipesModule,
   SkinModule,
   MomentModule,
   ReactiveFormsModule,
   FormsModule,
   FlexLayoutModule,
   UserCardComponent
],
providers: [
  SpinnerService
],
entryComponents: [
  ...Dialog_COMPONENTS
]
})

export class SharedModule { }
