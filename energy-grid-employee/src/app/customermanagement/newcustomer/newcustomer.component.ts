import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {customer} from '../../models/customer';
import { Router } from '@angular/router';
import {AppConfig} from "../../app.config";
import {catchError, map} from "rxjs/operators";
import {AuthenticationService} from "../../REST/authentication.service";

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.scss']
})

export class NewcustomerComponent implements OnInit {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  mobile: string;
  street: string;
  housenumber: string;
  zipcode: string;
  city: string;

  customer: customer;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {  }

  ngOnInit(): void {
  }

  newCustomer():void {

    console.log(this.firstname);

    this.customer = new customer(this.firstname, this.lastname, this.email, this.phone, this.mobile, this.street, this.street, this.zipcode, this.city);

    this.authenticationService.postNewCustomer(this.customer).subscribe(
      result => {
        if (result === this.firstname) {
          this.router.navigate(['customermanagement']);
        }
      }
    );
  }
}
