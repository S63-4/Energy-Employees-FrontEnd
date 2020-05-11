import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { Authentication } from './app-routing-guards';
import { httpInterceptors } from './REST/http-interceptors/interceptors';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { stompConfig } from './app.stomp.config';

@NgModule({
  declarations: [AppComponent, LoginComponent, ChangePasswordComponent, DashboardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    Authentication,
    httpInterceptors,
    CookieService,
    {
      provide: InjectableRxStompConfig,
      useValue: stompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
