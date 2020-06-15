import { Component, Input } from "@angular/core";
import { Chart } from "chart.js";
import { Rcv_message } from "src/app/websocket/JSONmodels/rcv_message";
import { JsonObject } from "src/app/models/jsonObject";
import { DatePipe } from "@angular/common";
@Component({
  selector: "linechart",
  templateUrl: "./linechart.component.html",
  styleUrls: ["./linechart.component.scss"],
})
export class LinechartComponent {
  @Input() data: JsonObject[];
  lineChartData: ChartModel[] = [];
  labels: string[] = [];
  lineChart: Chart;
  showText: boolean;
  @Input() text: string;
  @Input() chartId: string;
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
    this.data.forEach((obj) => this.updateCharts(obj));
  }

  onChartClick(event) {
    console.log(event);
  }
  updateCharts(body: JsonObject) {
    var consumptionTotal = body.consumption;
    var productionTotal = body.production;
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
    let dashboard = document.getElementById(this.chartId) as HTMLCanvasElement;
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
    this.showText = true;
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
