import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchcustomer',
  templateUrl: './searchcustomer.component.html',
  styleUrls: ['./searchcustomer.component.scss']
})
export class SearchcustomerComponent implements OnInit {

  searchquery: string;

  constructor() { }

  ngOnInit(): void {
  }

  searchCustomer():void {

    console.log(this.searchquery);

  }

}
