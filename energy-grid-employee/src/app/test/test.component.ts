import { Component, OnInit } from '@angular/core';
import {RxStompService} from "@stomp/ng2-stompjs";
import {Stomp} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private stompClient: any;

  connect() {
    var socket = new SockJS('http://localhost:9060/gs-guide-websocket');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, function (frame) {
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
    this.stompClient.send("/app/hello", {}, "test");
  }
}
