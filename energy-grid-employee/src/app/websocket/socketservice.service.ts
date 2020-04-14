import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import * as mqtt from 'mqtt';
import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";
import {printLine} from "tslint/lib/verify/lines";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() {
  }

  private subject: Rx.Subject<MessageEvent>;

  private wsbroker: string;
  private wsport: number;
  private client: mqtt.MqttClient;
  private options: any;

  public connect(url): Rx.Subject<MessageEvent> {


    if (!this.subject) {
      this.subject = this.create(url);
      console.log('successfully connected' + url);
    }
    return this.subject;
  }

  private create(url) {
    const ws = new WebSocket(url);

    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
      }
    );

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }

  private test(){
    this.wsbroker = location.hostname;  // mqtt websocket enabled broker
    this.wsport = 15675; // port for above
    this.client = new mqtt.Client(this.wsbroker, this.wsport);
    this.client.onConnectionLost = function (responseObject) {
      console.log("CONNECTION LOST - " + responseObject.toString());
    };
    this.client.onMessageArrived = function (message) {
      console.log("RECEIVE ON " + message.destinationName + " PAYLOAD " + message.payloadString);
      console.log(message.toString());
    };

    this.options = {
      timeout: 3,
      keepAliveInterval: 30,
      onSuccess: function () {
        console.log("CONNECTION SUCCESS");
        this.client.subscribe('/topic/test', {qos: 1});
      },
      onFailure: function (message) {
        console.log("CONNECTION FAILURE - " + message.errorMessage);
      }
    };
    if (location.protocol == "https:") {
      this.options.useSSL = true;
    }
    console.log("CONNECT TO " + this.wsbroker + ":" + this.wsport);
    this.client.connect(this.options);
  }
}
