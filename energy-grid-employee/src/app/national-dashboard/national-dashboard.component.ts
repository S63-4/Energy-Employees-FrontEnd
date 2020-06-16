import { Component, OnInit } from '@angular/core';
import {JsonObject} from "../models/jsonObject";
import {NationalService} from "../REST/national.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-national-dashboard',
  templateUrl: './national-dashboard.component.html',
  styleUrls: ['./national-dashboard.component.scss']
})
export class NationalDashboardComponent implements OnInit {
  regionNames: string[] = [
    "Noord-Brabant",
    "Noord Holland",
    "Friesland",
    "Zeeland",
  ];
  totalConsumption: number;
  totalProduction: number;
  jsonObject: JsonObject;
  national: JsonObject[] = [];

  constructor(private nationalService: NationalService) {}

  ngOnInit(): void {
    this.getRegions();
    this.getEachMinute();
  }

  getRegions(): void {
    this.totalConsumption = 0;
    this.totalProduction = 0;
    this.jsonObject = new JsonObject();
    for (let regionname of this.regionNames) {
      console.log(regionname);
      this.nationalService.getRegional(regionname).subscribe((data: any) => {
        console.log(regionname);
        try {
          if (data && data.region) {
            this.totalConsumption += data.consumption;
            this.totalProduction += data.production;
            this.jsonObject.date = data.date;
            this.jsonObject.region = "Nationaal";
            this.jsonObject.consumption = this.totalConsumption;
            this.jsonObject.production = this.totalProduction;
            this.national.push(this.jsonObject);
            console.log(this.jsonObject)
          }
        } catch (e) {
          console.error("gecatchte error", e);
        }
      },
        (err) => {
          console.error("gecatchte error", err);
        });
    }
  }

  getEachMinute(): void {
    interval(1000 * 60).subscribe((x) => {
      this.getRegions();
    });
  }
}
