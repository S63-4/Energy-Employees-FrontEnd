import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { AppConfig } from "../app.config";

@Injectable({
  providedIn: "root",
})
export class NationalService {
  constructor(private http: HttpClient) {}

  getRegional(region: String) {
    var URL;
    if (region === "Noord-Brabant") {
      URL = `https://staging.external.powerprice.marstan.net/status/getStatus`;
    } else if (region === "Zuid-Holland") {
      URL = `http://fsenergyservice.daphneprojects.online/energie/nh/2020/6/${new Date().getDate()}`;
    } else if (region === "Friesland") {
      URL = ``;
    } else if (region === "Zeeland") {
      URL = `${AppConfig.ApiBaseURL}/rest-forwarder/regional`;
    }

    return this.http.get<any>(URL);
  }
}
