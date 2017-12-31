import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { IndexComponent, UsersComponent } from './index/index.component';
import { routing } from './users.routes';
import { SharedModule } from '../../../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [
    UserComponent,
     IndexComponent,
     UsersComponent
    ]
})
export class UsersModule { }
