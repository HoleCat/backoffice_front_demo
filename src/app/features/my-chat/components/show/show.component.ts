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

  userData: UserData = {
    senderName: "",
    receiveName: "",
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
    private uploadService: UploadFilesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params.id;
    console.log(id);

    //cuando estes logueado o no
    if (this.tokenService.getToken()) {
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
          let chatMessage = {
            senderName: this.userData.senderName,
            receiverName: "",
            message: "",
            status: "JOIN"
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
          receiverName: this.userData.receiveName,
          message: this.userData.message,
          status: "MESSAGE"
        };

        this.privateChats.get(this.userData.senderName).push(chatMessage);

        this.client.publish({destination: '/app/private-message', body: JSON.stringify(chatMessage)});
        console.log(chatMessage);
      }
      this.upload()
  }

  newUser: NewUser = {
    id: 2,
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
    user: this.newUser,
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
      this.fileSubscription = this.my_chatService.saveFile(obj).subscribe(
        (data:any) => {
          console.log('chat: ', data);
        },
        (error:any) => {
          console.log('chat error : ', error);
        }
      );
  }

}
