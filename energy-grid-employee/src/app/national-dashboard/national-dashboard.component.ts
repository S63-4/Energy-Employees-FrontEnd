import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { JsonObject } from "../models/jsonObject";
import { NationalService } from "../REST/national.service";
import { interval } from "rxjs";
import { Chart } from "chart.js";
@Component({
  selector: "app-national-dashboard",
  templateUrl: "./national-dashboard.component.html",
  styleUrls: ["./national-dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NationalDashboardComponent implements AfterViewInit {
  regionNames: Region[] = [
    new Region("Noord-Brabant"),
    new Region("Noord-Holland"),
    new Region("Friesland"),
    new Region("Zeeland"),
  ];
  totalConsumption: number;
  totalProduction: number;
  jsonObject: JsonObject;
  national: JsonObject[] = [];
  loading: boolean = false;
  constructor(
    private nationalService: NationalService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.getEachMinute();
  }

  getRegions(): void {
    this.loading = true;
    this.changeDetection.detectChanges();
    this.totalConsumption = 0;
    this.totalProduction = 0;
    this.jsonObject = new JsonObject();
    this.getRegion(0).then(() =>
      this.getRegion(1).then(() =>
        this.getRegion(2).then(() => this.getRegion(3))
      )
    );
  }
  getRegion(i: number): Promise<void> {
    var regionname = this.regionNames[i].name;
    return this.nationalService
      .getRegional(regionname)
      .toPromise()
      .then(
        (data: any) => {
          try {
            if (data && data.region) {
              this.regionNames[i].consumption = data.consumption;
              this.regionNames[i].production = data.production;
              this.totalConsumption += data.consumption;
              this.totalProduction += data.production;
              this.jsonObject.date = new Date().toISOString();
              this.jsonObject.region = "Nationaal";
              this.jsonObject.consumption = this.totalConsumption;
              this.jsonObject.production = this.totalProduction;
              if (this.national.length > 15) {
                this.national.splice(0, 1);
              }
              if (
                this.regionNames.indexOf(this.regionNames[i]) ===
                this.regionNames.length - 1
              ) {
                0;
                this.national.push(this.jsonObject);
                this.loading = false;
                this.changeDetection.detectChanges();
                this.updateConsumptionDoughnutCharts();
              }
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

  updateConsumptionDoughnutCharts(): void {
    let dashboard = document.getElementById(
      "donut-national-consumer-chart"
    ) as HTMLCanvasElement;
    const context = dashboard.getContext("2d");
    context.clearRect(0, 0, dashboard.width, dashboard.height);
    var data = {
      datasets: [
        {
          data: this.regionNames.map((a) => a.consumption),
          backgroundColor: ["#ff0000", "#00ff00", "#0000ff", "#f0ff00"],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: this.regionNames.map((a) => a.name),
    };
    new Chart(context, {
      type: "doughnut",
      data: data,
    });
    this.updateProductionDoughnutCharts();
  }
  updateProductionDoughnutCharts() {
    let dashboard = document.getElementById(
      "donut-national-production-chart"
    ) as HTMLCanvasElement;
    const context = dashboard.getContext("2d");
    context.clearRect(0, 0, dashboard.width, dashboard.height);
    var data = {
      datasets: [
        {
          data: this.regionNames.map((a) => a.production),
          backgroundColor: ["#ff0000", "#00ff00", "#0000ff", "#f0ff00"],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: this.regionNames.map((a) => a.name),
    };
    new Chart(context, {
      type: "doughnut",
      data: data,
    });
    this.loading = false;
    this.changeDetection.detectChanges();
  }

  getEachMinute(): void {

    interval(1000 * 60).subscribe((x) => {
      this.getRegions();
    });
  }
}
class Region {
  name: string;
  production: number;
  consumption: number;
  constructor(name) {
    this.name = name;
  }
}
