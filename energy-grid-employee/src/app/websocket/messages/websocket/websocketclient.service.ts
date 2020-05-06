import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { SocketService } from "./socketservice.service";
import {Encapsulated_message} from "../messagemodels/encapsulated_message";

const SERVER_URL = 'ws://localhost:9060/topic/greetings';

@Injectable({
  providedIn: 'root'
})
export class WebsocketclientService {
  public message: Subject<Encapsulated_message>;

  constructor(private wsService: SocketService) {
    this.message = wsService
      .connect(SERVER_URL)
      .pipe(map((response: MessageEvent): Encapsulated_message => { 8;
        const data = JSON.parse(response.data);
        return {
          messageData: data
        };
      } )) as Subject<Encapsulated_message>;
  }
}
