import DateTimeFormat = Intl.DateTimeFormat;

export class JsonObject {
  private _date: string;
  private _region: string;
  private _consumption: number;
  private _production: number;


  constructor() {
  }


  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get region(): string {
    return this._region;
  }

  set region(value: string) {
    this._region = value;
  }

  get consumption(): number {
    return this._consumption;
  }

  set consumption(value: number) {
    this._consumption = value;
  }

  get production(): number {
    return this._production;
  }

  set production(value: number) {
    this._production = value;
  }
}
