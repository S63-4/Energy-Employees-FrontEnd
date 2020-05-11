import {Consumption} from "./consumption";
import {Production} from "./production";

export class Rcv_message {
  date: string;
  region: string;
  consumption: Consumption;
  production: Production;
}
