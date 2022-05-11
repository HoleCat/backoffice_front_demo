import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TokenService } from 'src/app/core/services/token.service';
import { UserData } from 'src/app/features/my-chat/interfaces/TutorialUserData';
import { Chat } from '../../directives/interfaces/Chat';
import { Status } from '../../directives/interfaces/Status';
import { User } from '../../directives/interfaces/User';
import { ChatService } from '../../directives/services/chat.service';

@Component({
  selector: 'app-message-client',
  templateUrl: './message-client.component.html',
  styleUrls: ['./message-client.component.css']
})
export class MessageClientComponent implements OnInit {

  
  //para el token
  isLogged = false;
  userName = '';

  //para web sockect
  private client: Client;
  connected: boolean = false;
  publicChats = [];
  privateChats = new Map();
  currentDate = new Date();
  
  constructor(
    private tokenService: TokenService,
    private chatService: ChatService
  ) { }

  userData: UserData = {
    senderName: "",
    receivername: "",
    connected: false,
    message: ""
  }

  status: Status = {
    id: 1,
    description: '',
    created_by: 0,
    created_at: '',
    updated_by: 0,
    updated_at: '',
    status_type: null
  }

  chat: Chat = {
    id: 0,
    topic: '',
    description: '',
    status: this.status,
    user: null,
    sender_name: '',
    receive_name: '',
    created_by: 1,
    created_at: this.currentDate,
    updated_by: 1,
    updated_at: this.currentDate,
  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
      this.userData.senderName = this.userName;

      this.chatService.userByUsername(this.userName).subscribe(
        data => {
          this.chat.user = data;
          this.chat.sender_name = this.userName;
          this.chat.topic = "Hola";
        },
        err => {
          console.log(err);
        }
      ); 

      this.client = new Client();
      
      this.client.webSocketFactory = () =>{
          return new SockJS("http://localhost:8092/ws");
      }
      this.client.onConnect = (frame) => {
          console.log('Conectados: ' + this.client.connected + ' : ' + frame);
          this.connected = true;
          this.userData.connected = true;

          this.saveChat(this.chat);
          console.log(this.chat);

        //   this.chatService.sendMailAdmin().subscribe(
        //       data => {
        //         console.log(data);
        //         console.log("Email Enviado");
        //       },
        //       err => {
        //         console.log(err);
        //       }
        // );

        this.client.subscribe('/chatroom/public', this.callBackPublicMessage);
        this.client.subscribe('/user/'+ this.userData.senderName + '/private', this.callBackMessage);

        let chatMessage = {
            senderName: this.userData.senderName,
            receiverName: "",
            message: "",
            status: "JOIN"
        };
        this.client.publish({destination: '/app/message', body: JSON.stringify(chatMessage)});
        
      }
      this.client.activate();
    }
 }

  saveChat(chat: Chat){
    this.chatService.saveChat(chat).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  } 


  //Se necesita para el funcionamiento del privado
  callBackPublicMessage = (payload:any) => {
    let payloadData = JSON.parse(payload.body);
    switch(payloadData.status){
        case "JOIN":
          if(!this.privateChats.get(payloadData.senderName)){
            this.privateChats.set(payloadData.senderName, []);
          }
           this.publicChats.push(payloadData);
        break;
    } 
  }

  callBackMessage = (payload:any) => {
    let payloadData = JSON.parse(payload.body);
    console.log('callBackMessage: ', payload);
    if(this.privateChats.get(payloadData.senderName)){
      this.privateChats.get(payloadData.senderName).push(payloadData);
    }else{
      let list = [];
      list.push(payloadData);
      this.privateChats.set(payloadData.senderName, list);
    }
     
  }

  sendPrivateMessage(): void{
    if(this.client){
      let chatMessage = {
        senderName: this.userData.senderName,
        receiverName: "admin",
        message: this.userData.message,
        status: "MESSAGE"
      };
      
        this.privateChats.get(this.userData.senderName).push(chatMessage);
      
      this.client.publish({destination: '/app/private-message', body: JSON.stringify(chatMessage)});
      console.log(chatMessage);
    }
  }

}

