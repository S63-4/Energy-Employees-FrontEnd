declare module Consumption {
    export class BigConsumers {
      num_consumers: number;
      total_consumption: number;
      consumers: any[];
    }
    export class Households {
      num_consumers: number;
      total_consumption: number;
      consumers: any[];
    }
    export class Industries {
      num_consumers: number;
      total_consumption: number;
      consumers: any[];
    }
  
    export class Consumption {
      households: Households;
      big_consumers: BigConsumers;
      industries: Industries;
    }
  }
  declare module Production {
    export class WindFarms {
      num_producers: number;
      total_production: number;
      producers: any[];
    }
  
    export class SolarFarms {
      num_producers: number;
      total_production: number;
      producers: any[];
    }
  
    export class PowerPlants {
      num_producers: number;
      total_production: number;
      producers: any[];
    }
  
    export class Households {
      num_producers: number;
      total_production: number;
      producers: any[];
    }
  
    export class Production {
      wind_farms: WindFarms;
      solar_farms: SolarFarms;
      power_plants: PowerPlants;
      households: Households;
    }
  }
  export class DashboardDataPoint {
    date: Date;
    consumption: Consumption.Consumption;
    production: Production.Production;
  }
  