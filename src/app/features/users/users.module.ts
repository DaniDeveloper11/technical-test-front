import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListUsersComponent,
    CreateUserComponent,
    EditUserComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ]
})
export class UsersModule { }
