import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {WebsocketclientService} from "../messages/websocket/websocketclient.service";
import {Rcv_message} from "../messages/messagemodels/rcv_message";
import {Encapsulated_message} from "../messages/messagemodels/encapsulated_message";

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerFactoryService {
  rcv_message: Rcv_message;

  constructor(private service: WebsocketclientService,
              private router: Router,) {
  }

  // method to send messages to the server
  sendMsg(msgContent: Object) {
    const msg = JSON.stringify(msgContent);
    this.service.message.next(new Encapsulated_message(msg));
  }

  // check what message type is sent to do something with the server response
  getHandler(data: string) {
    this.rcv_message = JSON.parse(data);
  }
}
