import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../REST/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  clientNr: string;
  password: string;
  loginResult: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.authenticationService.getLogin(this.clientNr, this.password);
  }

  register(): void {
    this.router.navigate(["register"]);
  }
}
