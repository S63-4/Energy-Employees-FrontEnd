import { Component, OnInit } from '@angular/core';
import { RxStompService} from '@stomp/ng2-stompjs';
import {Encapsulated_message} from "../messagemodels/encapsulated_message";
import {Message} from "@stomp/stompjs";

export class Messages implements OnInit {
  public receivedMessages: string[] = [];

  constructor(private rxStompService: RxStompService) { }

  ngOnInit() {
    // this.rxStompService.watch('/topic/greetings').subscribe((message: Message) => {
    //   this.receivedMessages.push(message.body);
    // });
  }

  onSendMessage() {
    const message = `Message generated at ${new Date}`;
    this.rxStompService.publish({destination: '/topic/greetings', body: message});
  }
}
