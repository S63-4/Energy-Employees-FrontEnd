import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../app.config";

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

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
  }

  newCustomer():void {

    console.log(this.firstname);

    var url = `${AppConfig.ApiBaseURL}${AppConfig.ApiUrls.NEWCUSTOMER}`;
    this.http.post(url, {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      phone: this.phone,
      mobile: this.mobile,
      street: this.street,
      housenumber: this.housenumber,
      zipcode: this.zipcode,
      city: this.zipcode
    })
  };

}
