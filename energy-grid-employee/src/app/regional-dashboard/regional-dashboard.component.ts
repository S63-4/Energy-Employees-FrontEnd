import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
} from "@angular/core";
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
    "Noord-Holland",
    "Friesland",
    "Zeeland",
  ];
  Zeeland: JsonObject[] = [];
  NoordBrabant: JsonObject[] = [];
  NoordHolland: JsonObject[] = [];
  Friesland: JsonObject[] = [];
  finishedloading: boolean = false;
  loading: boolean = false;
  constructor(
    private nationalService: NationalService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getRegion(0).then(() =>
      this.getRegion(1).then(() =>
        this.getRegion(2).then(() => this.getRegion(3))
      )
    );
    this.getEachMinute();
  }

  getRegion(i: number): Promise<void> {
    return this.nationalService
      .getRegional(this.regionNames[i])
      .toPromise()
      .then(
        (data: any) => {
          try {
            if (data && data.region) {
              if (this.Zeeland.length > 15) {
                this.Zeeland.splice(0, 1);
                this.NoordBrabant.splice(0, 1);
                this.NoordHolland.splice(0, 1);
                this.Friesland.splice(0, 1);
              }
              if (data.region === "Zeeland") {
                this.Zeeland.push(data);
              } else if (data.region === "Noord-Holland") {
                this.NoordHolland.push(data);
              } else if (data.region === "Noord-Brabant") {
                this.NoordBrabant.push(data);
              } else if (data.region === "Friesland") {
                this.Friesland.push(data);
              }
            }
            if (
              this.regionNames.indexOf(this.regionNames[i]) ===
              this.regionNames.length - 1
            ) {
              this.loading = true;
              this.cdRef.detectChanges();
              this.finishedloading = true;
              this.loading = false;
              this.cdRef.detectChanges();
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

  getEachMinute(): void {
    interval(1000 * 60).subscribe((x) => {
      this.getRegion(0).then(() =>
        this.getRegion(1).then(() =>
          this.getRegion(2).then(() => this.getRegion(3))
        )
      );
    });
  }
}
