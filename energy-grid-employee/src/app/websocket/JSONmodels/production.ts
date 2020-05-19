import {Producer_group, Household_producer_group} from "./producer_group";

export class Production {
  wind_farms: Producer_group;
  solar_farms: Producer_group;
  power_plants: Producer_group;
  households: Household_producer_group;

}
