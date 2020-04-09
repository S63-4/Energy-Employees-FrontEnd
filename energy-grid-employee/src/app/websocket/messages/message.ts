export class Message {
  messageType: string;
  messageData: string;

  constructor(type, data) {
    this.messageType = type;
    this.messageData = data;
  }
}
