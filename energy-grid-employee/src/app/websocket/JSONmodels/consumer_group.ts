import {Consumer} from "./consumer";
import { Household_consumer } from '../JSONmodels/household_consumer';

export class Consumer_group {
  num_consumers: number;
  total_consumption: number;
  consumers: Consumer[];
}
export class Household_consumer_group extends Consumer_group {
  consumers: Household_consumer[];
}
