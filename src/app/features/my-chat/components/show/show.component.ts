import { Component, OnInit } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { TokenService } from 'src/app/core/services/token.service';
import { MyChatService } from '../../services/mychat.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  //para sockjs
  private client: Client;
  connected: boolean = false;
  
  //para el logeado
  isLogged = false;
  userName = ''
  messages: Message[] = [];

  constructor(
    private tokenService: TokenService,
    private my_chatService: MyChatService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();

      //para socketjs
      this.client = new Client();
      //asignamos el sock JS al stomp
      this.client.webSocketFactory = () =>{
        return new SockJS("http://localhost:8092/chat")
      }
  
      this.client.onConnect = (frame) => {
        console.log('Conectados: ' + this.client.connected + ' : ' + frame);
        this.connected = true;

        this.client.subscribe('/topic/private-messages/1', e=>{
          console.log("estas conectado, ha dormir", e)
        });
      }

      this.client.onDisconnect = (frame) => {
        console.log('Desconectados: ' + !this.client.connected + ' : ' + frame);
        this.connected = false;
      }

    } else {
      this.isLogged = false;
      this.userName = '';
    }
  }

  connect(): void{
    this.client.activate();
  }

  disconnect(): void{
    this.client.deactivate();
  }

}
