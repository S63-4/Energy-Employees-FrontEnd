import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { Authentication } from './app-routing-guards';
import { httpInterceptors } from './REST/http-interceptors/interceptors';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import {CustomermanagementComponent} from "./customermanagement/customermanagement.component";
import { NewcustomerComponent } from './customermanagement/newcustomer/newcustomer.component';
import { SearchcustomerComponent } from './customermanagement/searchcustomer/searchcustomer.component';
@NgModule({
  declarations: [AppComponent, LoginComponent, ChangePasswordComponent, CustomermanagementComponent, NewcustomerComponent, SearchcustomerComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
  ],
  providers: [Authentication, httpInterceptors, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
