import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../app.config";

@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrls: ["./changepassword.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {
  current: string;
  newpass1: string;
  newpass2: string;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  changepass():void {
    if (this.newpass1 === this.newpass2) {
      var url = `${AppConfig.ApiBaseURL}${AppConfig.ApiUrls.CHANGEPASS}`;
      this.http.post(url, {
        oldPass : this.current,
        newPass: this.newpass1
      })
    }
  };
}
