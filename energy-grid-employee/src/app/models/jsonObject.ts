export interface SharedJSON {
  dateTime: Date;
  region: string;
  consumption: number;
  production: number;

  new (): SharedJSON;

  new (
    dateTime: Date,
    consumption: number,
    production: number
  ): SharedJSON;

  getDate(): Date;

  setDate(dateTime: Date): void;

  getRegion(): string;

  getConsumption(): number;

  setConsumption(consumption: number): void;

  getProduction(): number;

  setProduction(production: number): void;
}
