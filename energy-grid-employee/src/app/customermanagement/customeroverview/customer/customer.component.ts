import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppConfig} from "../../../app.config";
import {HttpClient} from "@angular/common/http";
import {customer} from "../../../models/customer";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customer : customer;

  customercode: string;

  constructor(private activatedroute: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(data => {
      this.customercode = data.customerCode.toString();
    })

    this.http
      .get(AppConfig.ApiBaseURL + AppConfig.ApiUrls.SEARCHCUSTOMER + "?customercode=" + this.customercode)
      .subscribe((data: customer) => {
        this.customer = data;
      }, error => console.log('oops', error) );
  }

  deleteCustomer():void{
    this.http
      .get(AppConfig.ApiBaseURL + AppConfig.ApiUrls.DELETECUSTOMER + "?customercode=" + this.customercode)
      .subscribe((data: customer) => {
        this.customer = data;
      }, error => console.log('oops', error) );
  }
}
