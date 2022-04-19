import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { Message } from '../../interfaces/Message';
import { ServerForm } from '../../interfaces/ServerForm';
import { MyChatService } from '../../services/mychat.service';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { UserData } from '../../interfaces/TutorialUserData';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  //para sockjs
  private client: Client;
  
  isLogged = false;
  userName = '';
  connected: boolean = false;
  publicChats = [];
  privateChats = new Map();
  tab: string = "CHATROOM";

  userData: UserData = {
      username: "",
      receivername: "",
      connected: false,
      message: ""
    }
  //messages: Message[] = [];

  constructor(
    private tokenService: TokenService,
    private my_chatService: MyChatService
  ) { }

  ngOnInit(): void {
    //cuando estes logueado o no
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
      //this.cargarMessage();

      // //para socketjs
      // this.client = new Client();
      // //asignamos el sock JS al stomp
      // this.client.webSocketFactory = () =>{
      //   return new SockJS("http://localhost:8092/ws")
      // }
  
      // this.client.onConnect = (frame) => {
      //   console.log('Conectados: ' + this.client.connected + ' : ' + frame);
      //   this.connected = true;

      //   this.client.subscribe('/topic/private-messages/1', e=>{
      //     console.log("estas conectado, ha dormir", e)
      //   });
      // }

      // this.client.onDisconnect = (frame) => {
      //   console.log('Desconectados: ' + !this.client.connected + ' : ' + frame);
      //   this.connected = false;
      // }
      this.userData.username = this.userName;

    } else {
      this.isLogged = false;
      this.userName = '';
    }
  
  }

  getUsers():string[] {
    
    const unique = this.publicChats
    .map(item => item.senderName)
    .filter((value, index, self) => self.indexOf(value) === index)

    return unique;
  }

  connect(): void{
    this.client = new Client();
      //asignamos el sock JS al stomp
    this.client.webSocketFactory = () =>{
        return new SockJS("http://localhost:8092/ws");
    }
    this.client.onConnect = (frame) => {
        console.log('Conectados: ' + this.client.connected + ' : ' + frame);
        this.connected = true;
        this.userData.connected = true;

        this.client.subscribe('/chatroom/public', this.ejemplo);

        this.client.subscribe('/user/'+ this.userData.username + '/private', this.ejemplo2);

        // this.client.subscribe('/user/'+ this.userData.username + '/private', this.ejemplo);

    }
    this.client.activate();

  }

  ejemplo = (payload:any) => {
    let payloadData = JSON.parse(payload.body);
    switch(payloadData.status){
        case "JOIN": 
        if(!this.privateChats.get(payloadData.senderName)){
          this.privateChats.set(payloadData.senderName, []);
        }
        break;
        case "MESSAGE":
        this.publicChats.push(payloadData);
        break;
    } 
  }

  ejemplo2 = (payload:any) => {
    let payloadData = JSON.parse(payload.body);
    console.log('ejemplo 2: ', payload);
    if(this.privateChats.get(payloadData.senderName)){
      this.privateChats.get(payloadData.senderName).push(payloadData);
    }else{
      let list = [];
      list.push(payloadData);
      this.privateChats.set(payloadData.senderName, list);
    }
     
  }

  disconnect(): void{
    this.client.deactivate();
  }

  sendPublicMessage(): void{
      if(this.client){
        let chatMessage = {
          senderName: this.userData.username,
          message: this.userData.message,
          status: "MESSAGE"
        };
        this.client.publish({destination: '/app/message', body: JSON.stringify(chatMessage)

      });
    }
  }
  sendPrivateMessage(): void{
    if(this.client){
      let chatMessage = {
        senderName: this.userData.username,
        receivername: '',
        message: this.userData.message,
        status: "MESSAGE"
      };
      if(this.userData.username != this.tab){
        //this.privateChats.set(this.tab, this.tab).push(chatMessage);
      }
      this.client.publish({destination: '/app/private-message', body: JSON.stringify(chatMessage)

    });
  }
}
  // message: Message = {
  //   username: this.tokenService.getUserName(),
  //   message: "",
  //   to_who: ""
  // }

  // chatSubscription: Subscription
  // chatregister(): void{
  //   if(this.chatSubscription != undefined) (this.chatSubscription.unsubscribe());
  //   this.chatSubscription = this.my_chatService.saveMessage(this.message).subscribe(
  //     (data:any) => {
  //       console.log('chat: ', data);
  //     },
  //     (error:any) => {
  //       console.log('chat error : ', error);
  //     }
  //   );
  // }

  // cargarMessage(): void {
  //   this.my_chatService.listMessage(this.tokenService.getUserName()).subscribe(
  //     data => {
  //       this.messages = data;
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

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
