import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../app.config";

@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrls: ["./changepassword.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
  
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {}
}
