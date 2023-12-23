import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {UsersComponent} from "./pages/users/users.component";
import {UserDetailsComponent} from "./pages/users/user-details/user-details.component";
import {UpdateUserComponent} from "./pages/users/update-user/update-user.component";
import {AddUserComponent} from "./pages/users/add-user/add-user.component";
import {GuestOnly} from "./guards/guest-only";
import {NoAuth} from "./guards/no-auth";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NoAuth] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuth] },
  { path: 'users', component: UsersComponent, canActivate: [GuestOnly] },
  { path: 'user/:id', component: UserDetailsComponent, canActivate: [GuestOnly] },
  { path: 'update/:id', component: UpdateUserComponent, canActivate: [GuestOnly] },
  { path: 'add', component: AddUserComponent, canActivate: [GuestOnly] },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    CommonModule
  ]
})
export class AppRoutingModule { }
