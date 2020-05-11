import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { CustomermanagementComponent} from "./customermanagement/customermanagement.component";
import { NewcustomerComponent } from "./customermanagement/newcustomer/newcustomer.component";
import { SearchcustomerComponent} from "./customermanagement/searchcustomer/searchcustomer.component";
import { CustomeroverviewComponent } from "./customermanagement/customeroverview/customeroverview.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'changepass', component: ChangePasswordComponent},
  { path: 'customermanagement', component: CustomermanagementComponent },
  { path: 'customermanagement/newcustomer', component: NewcustomerComponent },
  { path: 'customermanagement/searchcustomer', component: SearchcustomerComponent },
  { path: 'customermanagement/customeroverview', component: CustomeroverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
