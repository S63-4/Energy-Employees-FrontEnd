import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../REST/authentication.service';
import {WebsocketclientService} from "../websocket/messages/websocket/websocketclient.service";
import {MessageHandlerFactoryService} from "../websocket/handler/message-handler-factory";
import {Message} from "@stomp/stompjs";
import {RxStompService} from "@stomp/ng2-stompjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  clientNr: string;
  password: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {

  }

  login(): void {
    this.authenticationService.getLogin(this.clientNr, this.password);
  }
}
