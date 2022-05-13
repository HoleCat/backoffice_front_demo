import { Component, OnInit } from '@angular/core';
import { Client} from '@stomp/stompjs';
import { Observable, Subscription } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { TokenService } from 'src/app/core/services/token.service';
import { MyChatService } from '../../services/mychat.service';
import { UserData } from '../../interfaces/TutorialUserData';
import { NewUser } from 'src/app/core/interfaces/NewUser';
import { File_type } from '../../interfaces/File_type';
import { Files } from '../../interfaces/File';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFilesService } from '../../services/uploadFiles.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/features/chat/services/chat.service';
import { User } from '../../interfaces/User';
import { Chat } from 'src/app/features/chat/interfaces/Chat';
import { Message } from 'src/app/features/chat/interfaces/Message';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

//para el token
isLogged = false;
userName = '';

//para web sockect
private client: Client;
connected: boolean = false;
publicChats = [];
privateChats = new Map();
currentDate = new Date();

//para files
selectedFiles?: FileList;
currentFile?: File;
progress = 0;
messageFile = '';
fileInfos?: Observable<any>;

//para mensajes
messages: Message[] = [];

userData: UserData = {
  senderName: "",
  receiveName: "",
  connected: false,
  message: ""
}

chat: Chat = {
  id: 0,
  topic: '',
  description: '',
  status: null,
  user: null,
  sender_name: '',
  receive_name: '',
  created_by: null,
  created_at: null,
  updated_by: null,
  updated_at: null
}

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
  created_by: 0,
  created_at: '',
  updated_by: 0,
  updated_at: '',
  document_type: null,
  status: null
}

updated_by: User = {
  id: 0,
  name: '',
  last_name: '',
  userName: '',
  email: '',
  password: '',
  document_number: '',
  phone: '',
  photo: '',
  created_by: 0,
  created_at: '',
  updated_by: 0,
  updated_at: '',
  document_type: null,
  status: null
}

message: Message = {
  id: 0,
  chat: null,
  message: '',
  photo: '',
  path: '',
  status: null,
  created_by: 1,
  created_at: this.currentDate,
  updated_by: 1,
  updated_at: this.currentDate
}

constructor(
  private tokenService: TokenService,
  private chatService: ChatService,
  private uploadService: UploadFilesService,
  private activatedRoute: ActivatedRoute,
) { }

ngOnInit(): void {    
  //cuando estes logueado o no
  if (this.tokenService.getToken()) {

    this.getChat();
    this.getUser();

    this.isLogged = true;
    this.userName = this.tokenService.getUserName();
    this.userData.senderName = this.userName;

    this.client = new Client();
    //asignamos el sock JS al stomp
    this.client.webSocketFactory = () =>{
        return new SockJS("http://localhost:8092/ws");
    }
    this.client.onConnect = (frame) => {
        console.log('Conectados: ' + this.client.connected + ' : ' + frame);
        this.connected = true;
        this.userData.connected = true;

        this.client.subscribe('/chatroom/public', this.callBackPublicMessage);

        this.client.subscribe('/user/'+ this.userData.senderName + '/private', this.callBackPrivateMessage);
        this.chatService.userByUsername(this.userName).subscribe(
          data => {
            this.updated_by = data;
            this.chat.updated_by = this.updated_by;
            this.chat.receive_name = this.userName;
            this.chat.status.id = 3;
            this.chatService.updateChat(this.chat.id, this.chat).subscribe();
            console.log("updated_by:" + this.updated_by);
          },
          err => {
            console.log(err);
          }
        );
        let chatMessage = {
          senderName: this.userData.senderName,
          receiveName: this.user.userName,
          message: "",
          status: "JOIN"
        };
        console.log(chatMessage);
        this.client.publish({destination: '/app/message', body: JSON.stringify(chatMessage)});
        this.listMessageByChat(this.chat.id);
    }
    this.client.activate();

  } else {
    this.isLogged = false;
    this.userName = '';
  }

  this.fileInfos = this.uploadService.getFiles();
  console.log(this.fileInfos);

}

getUser() {
  const idu = this.activatedRoute.snapshot.params.idu;
  this.chatService.detailUser(idu).subscribe(
    (data:any) => {
      this.user = data;
      console.log('user bean: ',  this.user);
    },
    (error:any) => {
      console.log('user error : ', error);
    }
  );
}

getChat(){
  const idc = this.activatedRoute.snapshot.params.idc;
  this.chatService.detailChat(idc).subscribe(
    (data:any) => {
      this.chat = data;
      this.message.chat = this.chat;
      this.message.status = this.chat.status;
      console.log('chat bean: ',  this.chat);
    },
    (error:any) => {
      console.log('chat error : ', error);
    }
  );
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


//para web sokect
getUsers():string[] {
  
  const unique = this.publicChats
  .map(item => item.senderName)
  .filter((value, index, self) => self.indexOf(value) === index)

  return unique;
}

callBackPublicMessage = (payload:any) => {
  let payloadData = JSON.parse(payload.body);
  switch(payloadData.status){
      case "JOIN": 
      if(!this.privateChats.get(payloadData.senderName)){
        this.privateChats.set(payloadData.senderName, []);
      }
      this.publicChats.push(payloadData);
      break;
      case "MESSAGE":
      this.publicChats.push(payloadData);
      break;
  } 
}

callBackPrivateMessage = (payload:any) => {
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

disconnect(): void{
  this.client.deactivate();
}

sendPublicMessage(): void{
    if(this.client){
      let chatMessage = {
        senderName: this.userData.senderName,
        message: this.userData.message,
        status: "MESSAGE"
      };
      this.client.publish({destination: '/app/message', body: JSON.stringify(chatMessage)});
  }
}
sendPrivateMessage(): void{
    if(this.client){
      let chatMessage = {
        senderName: this.userData.senderName,
        receiverName: this.user.userName,
        message: this.userData.message,
        status: "MESSAGE"
      };
      this.message.message = this.userData.message;
      this.saveMessage(this.message);
      this.privateChats.get(this.userData.senderName).push(chatMessage);

      this.client.publish({destination: '/app/private-message', body: JSON.stringify(chatMessage)});
      console.log(chatMessage);
    }
    this.upload()
}

//file
file_type: File_type = {
  id: 1,
  description: '',
  short_description: '',
  created_by: 0,
  created_at: '',
  updated_by: 0,
  updated_at: ''
}

//para files

file: Files = {
  description: '',
  path: '',
  user: this.user,
  file_type: this.file_type,
  created_by: 1,
  created_at: '',
  updated_by: 1,
  updated_at: ''
}


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
      this.file.description = file.name;
      this.file.path = "uploads/" + file.name;
      this.uploadService.upload(this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.messageFile = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
            this.fileregister(this.file);
            console.log(event.body.message);
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;
          if (err.error && err.error.message) {
            this.messageFile = err.error.message;
          } else {
            this.messageFile = 'Could not upload the file!';
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
    this.fileSubscription = this.chatService.saveFile(obj).subscribe(
      (data:any) => {
        console.log('chat: ', data);
      },
      (error:any) => {
        console.log('chat error : ', error);
      }
    );
}

}
