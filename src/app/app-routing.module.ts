import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {UsersComponent} from "./pages/users/users.component";
import {UsersGuard} from "./guards/users.guard";
import {AuthGuard} from "./guards/auth.guard";
import {UserDetailsComponent} from "./pages/user-details/user-details.component";
import {UpdateUserComponent} from "./pages/update-user/update-user.component";
import {AddUserComponent} from "./pages/add-user/add-user.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [UsersGuard] },
  { path: 'user/:id', component: UserDetailsComponent, canActivate: [UsersGuard] },
  { path: 'update/:id', component: UpdateUserComponent, canActivate: [UsersGuard] },
  { path: 'add', component: AddUserComponent, canActivate: [UsersGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
