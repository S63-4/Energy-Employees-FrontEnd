import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {customer} from '../../models/customer';
import {AppConfig} from "../../app.config";

@Component({
  selector: 'app-searchcustomer',
  templateUrl: './searchcustomer.component.html',
  styleUrls: ['./searchcustomer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchcustomerComponent implements OnInit {

  customer: customer;

  searchquery: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  searchCustomer():void {
    this.http
      .get(AppConfig.ApiBaseURL + AppConfig.ApiUrls.SEARCHCUSTOMER + "?customercode=" + this.searchquery)
      .subscribe((data: customer) => {
        this.customer = data;
      }, error => console.log('oops', error) );

  }


}
