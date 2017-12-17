import { NgModule } from '@angular/core';
import { Notfound404Component } from './notfound404.component';
import { Notfound403Component } from './notfound403.component';
import { routing } from './error.routes';


@NgModule({
  imports: [
    routing
  ],
  declarations: [Notfound404Component,Notfound403Component]
})
export class ErrorsModule { }
