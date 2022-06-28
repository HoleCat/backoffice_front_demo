import { Component, Input, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import SockJS from 'sockjs-client';
import { TokenService } from 'src/app/core/services/token.service';
import { UserData } from 'src/app/features/my-chat/interfaces/TutorialUserData';
import { Chat } from '../../interfaces/Chat';
import { Message } from '../../interfaces/Message';
import { Status } from '../../interfaces/Status';
import { User } from '../../interfaces/User';
import { ChatService } from '../../services/chat.service';
import { ClientComponent } from '../client/client.component';

@Component({
  selector: 'app-message-client',
  templateUrl: './message-client.component.html',
  styleUrls: ['./message-client.component.css']
})
export class MessageClientComponent implements OnInit {
  //@Input() 
  // chat: Chat = {
  //   id: 0,
  //   topic: '',
  //   description: '',
  //   status: null,
  //   user: null,
  //   sender_name: '',
  //   receive_name: '',
  //   created_by: 0,
  //   created_at: null,
  //   updated_by: 0,
  //   updated_at: null
  // };
  //para el token
  isLogged = false;
  userName = '';

  //para web sockect
  private client: Client;
  connected: boolean = false;
  publicChats = [];
  privateChats = new Map();
  privateChats_ = [];
  currentDate = new Date();

  messages: Message[] = []; 

  message: Message = {
    id: 0,
    chat: null,
    message: '',
    photo: '',
    path: '',
    status: null,
    created_by: null,
    created_at: this.currentDate,
    updated_by: null,
    updated_at: this.currentDate
  }
  
  constructor(
    private tokenService: TokenService,
    private chatService: ChatService,
    private clientComponent: ClientComponent
  ) { }

  userData: UserData = {
    senderName: "",
    receiveName: "",
    connected: false,
    message: ""
  }

  status: Status = {
    id: 2,
    description: '',
    created_by: null,
    created_at: '',
    updated_by: null,
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
    created_by: null,
    created_at: this.currentDate,
    updated_by: null,
    updated_at: this.currentDate,
  };

  user: User = {
    id: 0,
    name: '',
    last_name: '',
    userName: '',
    email: '',
    password: '',
    document_number: '',
    phone: '',
    photo: '',
    created_at: '',
    updated_at: ''
  };

  serviceClientSubscription: Subscription;
  ngOnInit(): void {
    
    this.serviceClientSubscription = this.chatService.chat$.subscribe(
      (data:any)=>{
        this.chat = data;
      }
    )

    console.log('chat !!!', this.chat);
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
      this.userData.senderName = this.userName; 

      this.chatService.userByToken(this.tokenService.getToken()).subscribe(
        data => {
          this.user = data;
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

          if(this.clientComponent.findChat == false){

            console.log("hola");
            //Arreglar para el token

            this.chatService.setChat({...this.chat,user: this.user,sender_name: this.userName, topic: "Hola", created_by: this.user, updated_by: this.user,updated_at: this.currentDate, created_at: this.currentDate, status: this.status});
            this.saveChat(this.chat);
            console.log("Client.component" + this.clientComponent.findChat);
            console.log(this.chat);
          }
          else
          {
             //this.findChat(this.userName);
             this.listMessageByChat(this.chat.id);
             this.message.chat = this.chat;
             this.message.status = this.chat.status;
             console.log(this.message);
          };

          // this.chatService.sendMailAdmin().subscribe(
          //     data => {
          //       console.log(data);
          //       console.log("Email Enviado");
          //     },
          //     err => {
          //       console.log(err);
          //     }
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

  listMessageByChat(id: number){
    this.chatService.listMessagesByChat(id).subscribe(
      (data:any) => {
        this.messages = data;
        console.log('message: ', data);
      },
      (error:any) => {
        console.log('message error : ', error);
      }
   );
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

  saveMessage(message: Message){
    this.chatService.saveMessage(message).subscribe(
      (data:any) => {
        console.log('message: ', data);
      },
      (error:any) => {
        console.log('message error : ', error);
      }
    );
  }

  // findChat(token: string){
  //   this.chatService.chatByToken(token).subscribe(
  //     (data:any) => {
  //       this.chat = data;
  //       console.log('chat find: ',  this.chat);
  //     },
  //     (error:any) => {
  //       console.log('chat error : ', error);
  //     }
  //   );
  // }

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
    this.privateChats_.push(payloadData);
    // if(this.privateChats.get(payloadData.senderName)){
    //   this.privateChats.get(payloadData.senderName).push(payloadData);
    // }else{
    //   let list = [];
    //   list.push(payloadData);
    //   this.privateChats.set(payloadData.senderName, list);
    // }
     
  }

  sendPrivateMessage(): void{
    if(this.client){
      let chatMessage = {
        senderName: this.userData.senderName,
        receiverName: "admin",
        message: this.userData.message,
        status: "MESSAGE"
      };
      console.log(this.user);
      this.message.created_by = this.user;
      this.message.updated_by = this.user;
      this.message.message = this.userData.message;
      this.saveMessage(this.message);
      this.privateChats.get(this.userData.senderName).push(chatMessage);
      this.privateChats_.push(chatMessage);
      
      this.client.publish({destination: '/app/private-message', body: JSON.stringify(chatMessage)});
      console.log(chatMessage);
    }
  }

}

