import { Consumption } from "./consumption";
import { Production } from "./production";
import { Serializable } from "src/app/helpers/serialization";

export class Rcv_message extends Serializable {
  date: string;
  region: string;
  consumption: Consumption;
  production: Production;
}