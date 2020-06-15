import { Component, OnInit } from "@angular/core";
import { NationalService } from "../REST/national.service";
import { JsonObject } from "../models/jsonObject";
import { interval } from "rxjs";

@Component({
  selector: "app-regional-dashboard",
  templateUrl: "./regional-dashboard.component.html",
  styleUrls: ["./regional-dashboard.component.scss"],
})
export class RegionalDashboardComponent implements OnInit {
  regionNames: string[] = [
  //  "Noord-Brabant",
    "Noord Holland",
  //  "Friesland",
    "Zeeland",
  ];
  Zeeland: JsonObject[] = [];
  NoordBrabant: JsonObject[] = [];
  NoordHolland: JsonObject[] = [];
  Friesland: JsonObject[] = [];

  constructor(private nationalService: NationalService) {}

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions(): void {
    for (let regionname of this.regionNames) {
    console.log(regionname);
      this.nationalService.getRegional(regionname).subscribe((data: any) => {
        console.log(regionname);

        try {
          if (data && data.region) {
            if (data.region === "Zeeland") {
              this.Zeeland.push(data);
            } else if (data.region === "Noord Holland") {
              this.NoordHolland.push(data);
            } else if (data.region === "Noord-Brabant") {
              this.NoordBrabant.push(data);
            } else if (data.region === "Friesland") {
              this.Friesland.push(data);
            }
          }
        } catch (e) {
          console.error(e);
        }
      });
    }
  }

  getEachMinute(): void {
    interval(1000 * 60).subscribe((x) => {
      this.getRegions();
    });
  }
}
