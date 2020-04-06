import { Component } from "@angular/core";
import { AuthenticationService } from "./REST/authentication.service";
import { AppConfig } from "./app.config";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Employee portal Energy Grid";
  loggedIn: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.subscribeEvents();
  }

  subscribeEvents(): void {
    this.authService.loggedIn().subscribe((loggedIn) => {
      this.loggedIn = loggedIn;

      if (loggedIn) {
        console.log("ingelogd");
      } else {
        localStorage.removeItem(AppConfig.LocalStorageKeys.TOKEN);
        this.router.navigateByUrl("/login");
      }
    });
  }
}
