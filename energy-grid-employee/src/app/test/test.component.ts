import { Component, OnInit } from '@angular/core';
import {RxStompService} from "@stomp/ng2-stompjs";
import {Stomp} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import {AuthenticationService} from "../REST/authentication.service";
import {HelloMessage} from "./models/hellomessage";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  hellomsg: HelloMessage;

  constructor(private auth : AuthenticationService) { }

  ngOnInit(): void {
    console.log("hij laadt")
  }

  private stompClient: any;

  connect() {
    console.log("klikt");
    var socket = new SockJS('http://localhost:9060/websocket');
    this.stompClient = Stomp.over(socket);
    console.log(socket);
    this.stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/greetings', function (greeting) {
        console.log(JSON.parse(greeting.body).content);
      });
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  sendName() {
    this.hellomsg = new HelloMessage();
    this.hellomsg.setName("lotte");
    this.stompClient.send("/app/hello", {}, JSON.stringify(this.hellomsg));
  }
}
