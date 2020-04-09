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
}
