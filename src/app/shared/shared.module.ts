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
import { NotifyComponent, Dialog1, Dialog2  } from './components/notify/notify.component';

export const SHARED_COMPONENTS = [
  NavbarComponent,
  NavbarDownComponent,
  NavbarMobileComponent,
  SignupComponent,
  LoginComponent,
  MainintoComponent,
  
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SkinModule,
    NgPipesModule,
    MomentModule
  ],
  declarations: [
    WysiwygComponent,
    BlogcardComponent,
    LoadingWait,
    SharedComponent,
    NotifyComponent,
    Dialog1, Dialog2
  ],
  exports: [
   WysiwygComponent,
   BlogcardComponent,
   LoadingWait,
   SharedComponent,
   NotifyComponent,
   Dialog1,
   Dialog2
],
entryComponents: [
  NotifyComponent,
  Dialog1, Dialog2
]
})

export class SharedModule { }
