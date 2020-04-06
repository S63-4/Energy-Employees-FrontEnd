import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { Authentication } from "./app-routing-guards";
import { httpInterceptors } from "./REST/http-interceptors/interceptors";
import { CookieService } from "ngx-cookie-service";
import { FormsModule } from "@angular/forms";
@NgModule({
  declarations: [AppComponent, LoginComponent],
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
