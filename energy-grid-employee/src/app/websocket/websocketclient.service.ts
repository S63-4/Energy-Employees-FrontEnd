import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { SocketService } from "./socketservice.service";
import { Message } from "./messages/message";

const SERVER_URL = 'ws://localhost:8085/server/';

@Injectable({
  providedIn: 'root'
})
export class WebsocketclientService {
  public message: Subject<Message>;

  constructor(private wsService: SocketService) {
    this.message = wsService
      .connect(SERVER_URL)
      .pipe(map((response: MessageEvent): Message => { 8;
          const data = JSON.parse(response.data);
          return {
            messageType: data.messageType,
            messageData: data.messageData
          };
        }
      )) as Subject<Message>;
  }
}
