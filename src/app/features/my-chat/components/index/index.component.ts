import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { Message } from '../../interfaces/Message';
import { ServerForm } from '../../interfaces/ServerForm';
import { MyChatService } from '../../services/mychat.service';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  //para sockjs
  private client: Client;
  
  isLogged = false;
  userName = ''
  messages: Message[] = [];

  constructor(
    private tokenService: TokenService,
    private my_chatService: MyChatService
  ) { }

  ngOnInit(): void {
    //cuando estes logueado o no
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
      this.cargarMessage();

      

    } else {
      this.isLogged = false;
      this.userName = '';
    }
    //para socketjs
    this.client = new Client();
    //asignamos el sock JS al stomp
    this.client.webSocketFactory = () =>{
      return new SockJS("http://localhost:8092/chat")
    }

    this.client.onConnect = (frame) => {
      console.log('Conectados: ' + this.client.connected + ' : ' + frame);
    }

    this.client.activate();
  }

  message: Message = {
    username: this.tokenService.getUserName(),
    message: "",
    to_who: ""
  }

  chatSubscription: Subscription
  chatregister(): void{
    if(this.chatSubscription != undefined) (this.chatSubscription.unsubscribe());
    this.chatSubscription = this.my_chatService.savechat(this.message).subscribe(
      (data:any) => {
        console.log('chat: ', data);
      },
      (error:any) => {
        console.log('chat error : ', error);
      }
    );
  }

  cargarMessage(): void {
    this.my_chatService.listMessage(this.tokenService.getUserName()).subscribe(
      data => {
        this.messages = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  /*data: ServerForm = {
    server_name: '',
    user_name: '',
    message: '',
    flag: true
  }*/

  /*messages: any[] = [
    {
      user_name: 'crystal',
      text: 'lorem algo mundo xd',
      type: 'client'
    },
    {
      user_name: 'jorge',
      text: 'lorem algo mundo xd',
      type: 'server'
    },
    {
      user_name: 'crystal',
      text: 'lorem algo mundo xd',
      type: 'client'
    },
    {
      user_name: 'jorge',
      text: 'lorem algo mundo xd',
      type: 'server'
    },
    {
      user_name: 'crystal',
      text: 'lorem algo mundo xd',
      type: 'client'
    },
    {
      user_name: 'jorge',
      text: 'lorem algo mundo xd',
      type: 'server'
    }
  ]*/

}
