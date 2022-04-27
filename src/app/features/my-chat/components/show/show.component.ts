import { Component, OnInit } from '@angular/core';
import { Client} from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { TokenService } from 'src/app/core/services/token.service';
import { Chat } from 'src/app/features/chat/directives/interfaces/Chat';
import { MyChatService } from '../../services/mychat.service';
import { Message } from '../../interfaces/Message';
import { Status } from 'src/app/features/chatbot/interfaces/Status';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  //para sockjs
  private client: Client;
  
  //connected: boolean = false;
  
  //para el logeado
  isLogged = false;
  userName = ''
  //messages: Message[] = [];

  constructor(
    private tokenService: TokenService,
    private my_chatService: MyChatService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
      this.cargarChat();
      // //para socketjs
      // this.client = new Client();
      // //asignamos el sock JS al stomp
      // this.client.webSocketFactory = () =>{
      //   return new SockJS("http://localhost:8092/chat")
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

    } else {
      this.isLogged = false;
      this.userName = '';
    }
  }

  chat: Chat = {
    topic: "",
    description: "",
    id_user: null,
    id_status: null,
    created_by: null,
    created_at: "",
    updated_by: null,
    updated_at: ""
  }

  status: Status = {
    id: 0,
    description: '',
    created_by: 0,
    created_at: '',
    updated_by: 0,
    updated_at: ''
  }

  message: Message = {
    chat: this.chat,
    message: "",
    photo: "photo",
    path: "path",
    status3: this.status,
    created_by: 1,
    created_at: "2022-04-02T02:50:12.000Z",
    updated_by: 1,
    updated_at: "2022-04-02T02:50:12.000Z",
    id: 0
  }

  // chatSubscription: Subscription
  // chatupdate(): void{
  //   if(this.chatSubscription != undefined) (this.chatSubscription.unsubscribe());
  //   this.chatSubscription = this.my_chatService.updateChat(2,this.chat).subscribe(
  //     (data:any) => {
  //       console.log('chat: ', data);
  //     },
  //     (error:any) => {
  //       console.log('chat error : ', error);
  //     }
  //   );
  // }

  cargarChat(): void {
    this.my_chatService.listChats(1).subscribe(
      data => {
        if(data){
          this.chat = data[0];
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  MessageSubscription: Subscription

  saveMessage(): void{
    if(this.MessageSubscription != undefined) (this.MessageSubscription.unsubscribe());
    this.MessageSubscription = this.my_chatService.saveMessage(this.message).subscribe(
      (data:any) => {
        console.log('chat: ', data);
      },
      (error:any) => {
        console.log('chat error : ', error);
      }
    );
  }
  


  // connect(): void{
  //   this.client.activate();
  // }

  // disconnect(): void{
  //   this.client.deactivate();
  // }

}
