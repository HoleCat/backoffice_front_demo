import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { Message } from '../../interfaces/Message';
import { ServerForm } from '../../interfaces/ServerForm';
import { MyChatService } from '../../services/mychat.service';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { UserData } from '../../interfaces/TutorialUserData';
import { UploadFilesService } from '../../services/uploadFiles.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Files } from '../../interfaces/File';
import { fileURLToPath } from 'url';
import { User } from '../../interfaces/User';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  //para el token
  isLogged = false;
  userName = '';

  //para web sockect
  private client: Client;
  connected: boolean = false;
  publicChats = [];
  privateChats = new Map();
  tab: string = "CHATROOM";
  //
  user: User = {
    username: "",
    tipo: ""
  }

  userData: UserData = {
      username: "",
      receivername: "",
      connected: false,
      message: ""
  }
  //messages: Message[] = [];


  //para files
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;


  constructor(
    private tokenService: TokenService,
    private my_chatService: MyChatService,
    private uploadService: UploadFilesService
  ) { }

  ngOnInit(): void {
    //cuando estes logueado o no
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

          this.client.subscribe('/user/'+ this.userData.username + '/private', this.ejemplo2);
          let chatMessage = {
            senderName: this.userData.username,
            receiverName: "user",
            message: "",
            status: "MESSAGE"
          };
          this.client.publish({destination: '/app/message', body: JSON.stringify(chatMessage)});
          
      }
      this.client.activate();
      if(this.client){
        
      }
      

    } else {
      this.isLogged = false;
      this.userName = '';
    }

    this.fileInfos = this.uploadService.getFiles();
    console.log(this.fileInfos);
  
  }


  //para web sokect
  getUsers():string[] {
    
    const unique = this.publicChats
    .map(item => item.senderName)
    .filter((value, index, self) => self.indexOf(value) === index)

    return unique;
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
        this.client.publish({destination: '/app/message', body: JSON.stringify(chatMessage)});
    }
  }
  sendPrivateMessage(): void{
      if(this.client){
        let chatMessage = {
          senderName: this.userData.username,
          receiverName: "user",
          message: this.userData.message,
          status: "MESSAGE"
        };
        if(this.userData.username != this.tab){
          this.privateChats.set(this.tab, chatMessage);
        }
        this.client.publish({destination: '/app/private-message', body: JSON.stringify(chatMessage)});
        console.log(chatMessage);
    }
  }

  //para files

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        console.log(file.name);
        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
              console.log(event.body);
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          });
      }
      this.selectedFiles = undefined;
    }
  }

  fileSubscription: Subscription
    fileregister(obj: Files): void{
      if(this.fileSubscription != undefined) (this.fileSubscription.unsubscribe());
      this.fileSubscription = this.my_chatService.saveFile(obj).subscribe(
        (data:any) => {
          console.log('chat: ', data);
        },
        (error:any) => {
          console.log('chat error : ', error);
        }
      );
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
