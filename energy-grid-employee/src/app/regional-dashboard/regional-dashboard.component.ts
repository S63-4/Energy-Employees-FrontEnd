import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NationalService } from "../REST/national.service";
import { JsonObject } from "../models/jsonObject";
import { interval, Observable, Subscription } from "rxjs";

@Component({
  selector: "app-regional-dashboard",
  templateUrl: "./regional-dashboard.component.html",
  styleUrls: ["./regional-dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RegionalDashboardComponent implements OnInit {
  regionNames: string[] = [
    "Noord-Brabant",
    "Zuid-Holland",
    "Friesland",
    "Zeeland",
  ];
  Zeeland: JsonObject[] = [];
  NoordBrabant: JsonObject[] = [];
  ZuidHolland: JsonObject[] = [];
  Friesland: JsonObject[] = [];
  finishedloading: boolean = false;
  loading: boolean = false;
  constructor(private nationalService: NationalService) {}

  ngOnInit(): void {
    this.getRegions();
    this.getEachMinute();
  }

  getRegions() {
    this.loading = true;

    for (let regionname of this.regionNames) {
      console.log(regionname);
      this.nationalService.getRegional(regionname).subscribe(
        (data: any) => {
          console.log(regionname);

          try {
            if (data && data.region) {
              if (this.Zeeland.length > 15) {
                this.Zeeland.splice(0, 1);
                this.NoordBrabant.splice(0, 1);
                this.ZuidHolland.splice(0, 1);
                this.Friesland.splice(0, 1);
              }
              if (data.region === "Zeeland") {
                this.Zeeland.push(data);
              } else if (data.region === "Zuid-Holland") {
                this.ZuidHolland.push(data);
              } else if (data.region === "Noord-Brabant") {
                this.NoordBrabant.push(data);
              } else if (data.region === "Friesland") {
                this.Friesland.push(data);
              }
            }
            if (
              this.regionNames.indexOf(regionname) ===
              this.regionNames.length - 1
            ) {
              this.finishedloading = true;
              this.loading = false;
            }
          } catch (e) {
            console.error("gecatchte error", e);
          }
        },
        (err) => {
          console.error("gecatchte error", err);
        }
      );
    }
  }

  getEachMinute(): void {
    interval(1000 * 60).subscribe((x) => {
      this.getRegions();
    });
  }
}
