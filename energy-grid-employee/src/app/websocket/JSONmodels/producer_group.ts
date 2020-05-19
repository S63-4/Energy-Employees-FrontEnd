import {Producer} from "./producer";
import { Household_producer } from '../JSONmodels/household_producer';

export class Producer_group {
  num_producers: number;
  total_production: number;
  producers: Producer[];
}
export class Household_producer_group extends Producer_group {
  producers: Household_producer[];
}
