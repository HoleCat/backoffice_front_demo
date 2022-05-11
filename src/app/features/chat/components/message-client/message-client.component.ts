import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TokenService } from 'src/app/core/services/token.service';
import { UserData } from 'src/app/features/my-chat/interfaces/TutorialUserData';
import { User } from 'src/app/features/my-chat/interfaces/User';

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
  tab: string = "CHATROOM";
  currentDate = new Date();
  
  constructor(
    private tokenService: TokenService,
  ) { }


  userData: UserData = {
    username: "",
    receivername: "",
    connected: false,
    message: ""
  }

  user: User = {
    username: "",
    tipo: ""
  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
      this.userData.username = this.userName;
      this.user.username = this.userName;

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

          let chatMessage = {
            senderName: this.userData.username,
            receiverName: "user",
            message: "",
            status: "MESSAGE"
          };
          this.client.publish({destination: '/app/message', body: JSON.stringify(chatMessage)});
          
      }
      this.client.activate();
  }
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

}

