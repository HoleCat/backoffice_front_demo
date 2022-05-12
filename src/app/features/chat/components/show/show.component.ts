import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '@stomp/stompjs';
import { Observable, Subscription } from 'rxjs';
import SockJS from 'sockjs-client';
import { NewUser } from 'src/app/core/interfaces/NewUser';
import { TokenService } from 'src/app/core/services/token.service';
import { Files } from 'src/app/features/my-chat/interfaces/File';
import { File_type } from 'src/app/features/my-chat/interfaces/File_type';
import { UserData } from 'src/app/features/my-chat/interfaces/TutorialUserData';
import { MyChatService } from 'src/app/features/my-chat/services/mychat.service';
import { UploadFilesService } from 'src/app/features/my-chat/services/uploadFiles.service';
import { Chat } from '../../interfaces/Chat';
import { Message } from '../../interfaces/Message';
import { User } from '../../interfaces/User';
import { ChatService } from '../../services/chat.service';

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
  message = '';
  fileInfos?: Observable<any>;

  userData: UserData = {
    senderName: "",
    receiveName: "",
    connected: false,
    message: ""
  }
  //messages: Message[] = [];

  chat: Chat = {
    id: 0,
    topic: '',
    description: '',
    status: undefined,
    user: undefined,
    sender_name: '',
    receive_name: '',
    created_by: 0,
    created_at: undefined,
    updated_by: 0,
    updated_at: undefined
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

  messages: Message = {
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
          this.chat.receive_name = this.userName;
          this.chatService.updateChat(this.chat.id, this.chat).subscribe();
          let chatMessage = {
            senderName: this.userData.senderName,
            receiveName: this.user.userName,
            message: "",
            status: "JOIN"
          };
          console.log(chatMessage);
          this.client.publish({destination: '/app/message', body: JSON.stringify(chatMessage)});
          
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
        this.messages.chat = this.chat;
        this.messages.status = this.chat.status;
        console.log('chat bean: ',  this.chat);
      },
      (error:any) => {
        console.log('chat error : ', error);
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
        this.messages.message = this.userData.message;
        this.saveMessage(this.messages);
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
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
              this.fileregister(this.file);
              console.log(event.body.message);
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
