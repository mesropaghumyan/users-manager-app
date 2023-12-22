import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {RouterLink, RouterOutlet} from "@angular/router";
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/users/user-details/user-details.component';
import { UpdateUserComponent } from './pages/users/update-user/update-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import {MatDividerModule} from "@angular/material/divider";
import { UserFormComponent } from './pages/users/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UserDetailsComponent,
    UpdateUserComponent,
    NavbarComponent,
    AddUserComponent,
    UserFormComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterOutlet,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatDividerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
