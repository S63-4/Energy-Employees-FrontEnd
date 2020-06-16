import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { Rcv_message } from "../websocket/JSONmodels/rcv_message";
import { Chart } from "chart.js";
import { DatePipe } from "@angular/common";
import { AppConfig } from "../app.config";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",

  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private stompClient: any;
  data: Rcv_message[] = [];
  lineChartData: ChartModel[] = [];
  labels: string[] = [];
  lineChart: Chart;
  showText: boolean;
  constructor() {}
  ngOnInit(): void {
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
    this.connect("");
  }

  onChartClick(event) {
    console.log(event);
  }
  ngOnDestroy(): void {
    this.disconnect();
  }

  updateCharts(body: Rcv_message) {
    var consumptionTotal =
      body.consumption.big_consumers.total_consumption +
      body.consumption.households.total_consumption +
      body.consumption.industries.total_consumption;
    var productionTotal =
      body.production.households.total_production +
      body.production.power_plants.total_production +
      body.production.solar_farms.total_production +
      body.production.wind_farms.total_production;
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
    this.updateConsumptionDoughnutCharts(body);
    this.updateProductionDoughnutCharts(body);
    this.showText = true;
  }
  updateConsumptionDoughnutCharts(body: Rcv_message): void {
    let dashboard = document.getElementById(
      "donut-consumer-chart"
    ) as HTMLCanvasElement;
    const context = dashboard.getContext("2d");
    context.clearRect(0, 0, dashboard.width, dashboard.height);
    var data = {
      datasets: [
        {
          data: [
            body.consumption.big_consumers.total_consumption,
            body.consumption.households.total_consumption,
            body.consumption.industries.total_consumption,
          ],
          backgroundColor: ["#ff0000", "#00ff00", "#0000ff"],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Big consumers", "Households", "Industries"],
    };
    new Chart(context, {
      type: "doughnut",
      data: data,
    });
  
  }
  updateProductionDoughnutCharts(body : Rcv_message) {
    let dashboard = document.getElementById(
      "donut-production-chart"
    ) as HTMLCanvasElement;
    const context = dashboard.getContext("2d");
    context.clearRect(0, 0, dashboard.width, dashboard.height);
    var data = {
      datasets: [
        {
          data: [
            body.production.power_plants.total_production,
            body.production.households.total_production,
            body.production.solar_farms.total_production,
            body.production.wind_farms.total_production,
          ],
          backgroundColor: ["#ff0000", "#00ff00", "#0000ff", "#f0ff00"],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Power plants", "Households", "Solar farms", "Wind farms"],
    };
    new Chart(context, {
      type: "doughnut",
      data: data,
    });
  }
  /**
   * depending on the simulator you want to connect to:
   * /topic/regional for the regional simulator
   * /topic/national for the national simulator
   * /topic/market for the market simulator
   */
  connect(url: string) {
    url = "/topic/regional";
    var socket = new SockJS(AppConfig.WebSocketBaseUrl + "websocket");
    this.stompClient = Stomp.over(socket);
    console.log(socket);
    this.stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame);
      this.stompClient.subscribe(url, (message) => {
        let body: Rcv_message = new Rcv_message();
        body.fillFromJSON(message.body);
        console.log(body);
        this.updateCharts(body);
      });
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
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
