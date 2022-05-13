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
      
    } 
    else 
    {
      this.isLogged = false;
      this.userName = '';
    }

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
        console.log('chat bean: ',  this.chat);
      },
      (error:any) => {
        console.log('chat error : ', error);
      }
    );
  }

  disconnect(): void{
    this.client.deactivate();
  }


}
