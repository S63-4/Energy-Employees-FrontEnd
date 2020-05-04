import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../app.config";

@Component({
  selector: 'app-customermanagement',
  templateUrl: './customermanagement.component.html',
  styleUrls: ['./customermanagement.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomermanagementComponent implements OnInit {

  constructor() {  }

  ngOnInit(): void {
  }
}
