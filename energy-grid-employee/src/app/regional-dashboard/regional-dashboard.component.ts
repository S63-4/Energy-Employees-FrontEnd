import { Component, OnInit } from '@angular/core';
import {NationalService} from "../REST/national.service";
import {JsonObject} from "../models/jsonObject";
import { Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { Rcv_message } from "../websocket/JSONmodels/rcv_message";
import {DatePipe} from "@angular/common";
import { Chart } from "chart.js";
import {AppConfig} from "../app.config";

@Component({
  selector: 'app-regional-dashboard',
  templateUrl: './regional-dashboard.component.html',
  styleUrls: ['./regional-dashboard.component.scss']
})
export class RegionalDashboardComponent implements OnInit {
  regionNames: string[] = ["Noord-Brabant, Noord Holland, 3, Zeeland"];
  regions: JsonObject[];
  regionData: JsonObject;

  private stompClient: any;
  lineChartData: ChartModel[] = [];
  labels: string[] = [];
  lineChart: Chart;

  constructor(private nationalService: NationalService) {
  }

  ngOnInit(): void {
    this.getRegions();
    let production: ChartModel = new ChartModel(
      "Productie",
      false,
      "rgba(255, 0, 0, 1)"
    );
    let consumption: ChartModel = new ChartModel(
      "Consumptie",
      false,
      "rgba(0, 255, 0, 1)"
    );
    this.lineChartData.push(production, consumption);
  }

  getRegions(): void {
      for (var i= 0; i < this.regionNames.length; i++){
        this.nationalService.getRegional(this.regionNames[i]).subscribe((data: JsonObject) =>{
          if (data.region !== null){
            this.regionData = data;
            this.regions.push(data);
          }
        });
      }
  }

  updateCharts(body: JsonObject) {
    var consumptionTotal =
      body.consumption;
    var productionTotal =
      body.production;
    var productiondata = this.lineChartData.filter(
      (l) => l.label == "Productie"
    )[0];
    var consumptiondata = this.lineChartData.filter(
      (l) => l.label == "Consumptie"
    )[0];
    productiondata.data.push(productionTotal);
    consumptiondata.data.push(consumptionTotal);
    var datepipe = new DatePipe("en-US");
    var date = datepipe.transform(body.date, "shortTime");
    this.labels.push(date);
    if (this.labels.length > 15) {
      productiondata.data.splice(0, 1);
      consumptiondata.data.splice(0, 1);
      this.labels.splice(0, 1);
    }
    if (this.lineChart) this.lineChart.destroy();
    let dashboard = document.getElementById("chart") as HTMLCanvasElement;
    const context = dashboard.getContext("2d");
    context.clearRect(0, 0, dashboard.width, dashboard.height);
    this.lineChart = new Chart(dashboard, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: this.lineChartData,
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
  }


}

class ChartModel {
  label: string;
  data: number[] = [];
  borderColor: string;
  fill: any;
  constructor(label: string, fill, borderColor: string) {
    this.label = label;
    this.fill = fill;
    this.borderColor = borderColor;
  }
}
