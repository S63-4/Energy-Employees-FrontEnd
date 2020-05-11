import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  Renderer2,
} from "@angular/core";
import { DashboardDataPoint } from "../models/dashboard-data-point.model";
import { Chart } from "chart.js";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../app.config";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",

  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  // Charts
  chartOptions = {
    responsive: false,
  };
  chartData: ChartModel[] = [];
  labels: string[] = [];
  chart: Chart;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  onChartClick(event) {
    console.log(event);
  }

  updateCharts(period) {
    this.chartData = [];
    this.labels = [];
    this.http
      .get(
        AppConfig.ApiBaseURL +
          `${
            AppConfig.ApiUrls.CHANGEPASS
          }?statusPeriod=${period}&currentDate=${new Date().getTime()}`
      )
      .subscribe((datapoint: DashboardDataPoint) => {
        let consumption: ChartModel = new ChartModel("Consumptie");
        consumption.backgroundColor = "rgba(255,0,0, 0.8)";
        let production: ChartModel = new ChartModel("Productie");
        production.backgroundColor = "rgba(0, 255, 0, 0.8)";
        consumption.data.push(
          datapoint.consumption.big_consumers.total_consumption
        );
        consumption.data.push(
          datapoint.consumption.households.total_consumption
        );
        consumption.data.push(
          datapoint.consumption.industries.total_consumption
        );
        production.data.push(datapoint.production.households.total_production);
        production.data.push(
          datapoint.production.power_plants.total_production
        );
        production.data.push(datapoint.production.solar_farms.total_production);
        production.data.push(datapoint.production.wind_farms.total_production);
        this.labels.push(datapoint.date.toLocaleTimeString());
        this.chartData.push(consumption, production);
        if (this.chart) this.chart.destroy();

        let dashboard = document.getElementById("chart") as HTMLCanvasElement;
        const context = dashboard.getContext("2d");
        context.clearRect(0, 0, dashboard.width, dashboard.height);
        this.chart = new Chart(dashboard, {
          type: "bar",
          data: {
            labels: this.labels,
            datasets: this.chartData,
          },
          options: {
            responsive: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      });
  }
}
class ChartModel {
  label: string;
  data: number[] = [];
  backgroundColor: string;
  constructor(label: string) {
    this.label = label;
  }
}
enum StatusPeriod {
  YEAR,
  THREEMONTHS,
  MONTH,
  WEEK,
}
