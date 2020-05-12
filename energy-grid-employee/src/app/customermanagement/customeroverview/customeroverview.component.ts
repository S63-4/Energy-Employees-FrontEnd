import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../app.config";
import {customer} from "../../models/customer";

@Component({
  selector: 'app-customeroverview',
  templateUrl: './customeroverview.component.html',
  styleUrls: ['./customeroverview.component.scss']
})
export class CustomeroverviewComponent implements OnInit {

  customers: customer[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers():void {
    this.http
      .get(AppConfig.ApiBaseURL + AppConfig.ApiUrls.AllCUSTOMERS)
      .subscribe((data: Array<customer>) => {
        this.customers = data;
      }, error => console.log('oops', error) );
  }

  openSelectedCustomer():void{

  }

}
