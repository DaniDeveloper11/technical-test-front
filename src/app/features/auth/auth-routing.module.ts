import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthRedirectGuard } from '../../core/guards/auth-redirect.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
