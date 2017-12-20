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
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SkinModule,
    NgPipesModule
  ],
  declarations: [
    WysiwygComponent,
    BlogcardComponent,
    LoadingWait
  ],
  exports: [
   WysiwygComponent,
   BlogcardComponent,
   LoadingWait
]
})

export class SharedModule { }
