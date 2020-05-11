export class HelloMessage {
  private name: string;


  constructor() {
  }


  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }
}
