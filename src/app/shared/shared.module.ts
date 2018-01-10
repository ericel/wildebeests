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
import * as Ps from 'perfect-scrollbar'
import { UsersCard } from '../public/content/users/shared/users-card/users-card.component';
import { UserDetailCard } from '../public/content/users/shared/user-card/user-card.component';
import { LocationService } from './services/location.service';
import { VotingComponent } from './components/voting/voting.component';
import { VotingService } from './services/voting.service';
import { ReadMoreComponent } from './components/read-more';
import { IsotopeModule } from 'ngx-isotope';
import { CountryService } from './components/country-picker/country.service';
import { UploadService } from './services/upload/upload.service';

import * as firebase from 'firebase';
import { environment } from '../../environments/environment';
import { StarReviewComponent } from './components/star-review/star-review.component';
import { StarReviewService } from './components/star-review/star-review.service';
import { DealsService } from './services/deals/deals.service';
import { ChartModule } from '@rijine/ngx-highcharts';
import { HighchartsStatic } from '@rijine/ngx-highcharts/dist/services/highcharts.service';
import * as highcharts from 'highcharts';

export function highchartsFactory() {
  return highcharts;
}
firebase.initializeApp(environment.firebase);

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
    SkinModule,
    NgPipesModule,
    MomentModule,
    FlexLayoutModule,
    IsotopeModule,
    ChartModule
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
    UsersCard,
    UserDetailCard,
    VotingComponent,
    VotingComponent,
    ReadMoreComponent,
    StarReviewComponent
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
   UsersCard,
   UserDetailCard,
   VotingComponent,
   ReadMoreComponent,
   IsotopeModule,
   StarReviewComponent,
   ChartModule
],
providers: [
  SpinnerService,
  LocationService,
  VotingService,
  CountryService,
  UploadService,
  StarReviewService,
  DealsService,
  {
    provide: HighchartsStatic,
    useFactory: highchartsFactory
 }
],
entryComponents: [
  ...Dialog_COMPONENTS
]
})

export class SharedModule { }
