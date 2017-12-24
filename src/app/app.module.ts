import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { SkinModule } from './shared/core/skin/skin.module';
import { CoreModule } from './shared/core/core.module';
import {NgPipesModule} from 'ngx-pipes';

import { AppComponent } from './app.component';
import { PUBLIC_COMPONENTS } from './public';


import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { PizzaModule } from './pizza/pizza.module';
import { reducers } from './reducers';

import { SharedModule, SHARED_COMPONENTS } from './shared/shared.module';
import { AuthModule } from './shared/core/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    ...PUBLIC_COMPONENTS,
    ...SHARED_COMPONENTS,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'wildebeests' }),
    routing,
    HttpModule,
    SkinModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebase, 'wildebeests'),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    PizzaModule,
    CoreModule,
    NgPipesModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AuthModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
