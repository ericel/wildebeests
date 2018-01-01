import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { IndexComponent, UsersComponent } from './index/index.component';
import { routing } from './users.routes';
import { SharedModule } from '../../../shared/shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [
    UserComponent,
     IndexComponent,
     UsersComponent,
     UserDetailComponent
    ]
})
export class UsersModule { }
