import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { IndexComponent } from './index/index.component';
import { routing } from './users.routes';
@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [UserComponent, IndexComponent]
})
export class UsersModule { }
