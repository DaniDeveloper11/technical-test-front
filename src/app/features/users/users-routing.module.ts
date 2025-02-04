import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children:[
      {path:'', component:ListUsersComponent},
      { path: 'create', component: CreateUserComponent },
      { path: 'edit/:id', component: EditUserComponent }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
