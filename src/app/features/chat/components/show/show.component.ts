import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { Chat } from '../../directives/interfaces/Chat';
import { Message } from '../../directives/interfaces/Message';
import { ChatService } from '../../directives/services/chat.service';

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
    private chatService: ChatService
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

  message: Message = {
    id_chat: 2,
    message: "",
    photo: "photo",
    path: "path",
    id_status: 1,
    created_by: 1,
    created_at: "2022-04-02T02:50:12.000Z",
    updated_by: 1,
    updated_at: "2022-04-02T02:50:12.000Z"
  }

  chatSubscription: Subscription
  chatupdate(): void{
    if(this.chatSubscription != undefined) (this.chatSubscription.unsubscribe());
    this.chatSubscription = this.chatService.updateChat(2,this.chat).subscribe(
      (data:any) => {
        console.log('chat: ', data);
      },
      (error:any) => {
        console.log('chat error : ', error);
      }
    );
  }

  cargarChat(): void {
    this.chatService.listChats(1).subscribe(
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
    this.MessageSubscription = this.chatService.saveMessage(this.message).subscribe(
      (data:any) => {
        console.log('chat: ', data);
      },
      (error:any) => {
        console.log('chat error : ', error);
      }
    );
  }




  // chat: Chat = null;
  // myForm: FormGroup;

  // constructor(
  //   private activatedRoute: ActivatedRoute,
  //   private router: Router,
  //   private fb: FormBuilder,
  //   private chatService: ChatService
  // ) { }

  // ngOnInit(): void {
  //   const id = this.activatedRoute.snapshot.params.id;
  //   console.log(id);
  //   this.chatService.detail(id).subscribe(
  //     data => {
  //       this.chat = data;
  //       console.log(data);

  //       this.myForm.controls['topic'].setValue(this.chat.topic);
  //       this.myForm.controls['description'].setValue(this.chat.description);
  //       this.myForm.controls['id_status'].setValue(this.chat.id_status);
  //       this.myForm.controls['id_user'].setValue(this.chat.id_user);
  //       this.myForm.controls['created_by'].setValue(this.chat.created_by);
  //       this.myForm.controls['created_at'].setValue(this.chat.created_at);
  //       this.myForm.controls['updated_by'].setValue(this.chat.updated_by);
  //       this.myForm.controls['updated_at'].setValue(this.chat.updated_at);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );

  //   this.myForm = this.fb.group({
      
  //     topic: [
  //       '',
  //       [
  //         Validators.required
  //       ]
  //     ],
  //     description: [
  //       '',
  //       [
  //         Validators.required
  //       ]
  //     ],
  //     id_status: [
  //       '',
  //       [
  //         Validators.required
  //       ]
  //     ],
  //     id_user: [
  //       '',
  //       [
  //         Validators.required
  //       ]
  //     ],
  //     created_by: [
  //       '',
  //       [
  //         Validators.required
  //       ]
  //     ],
  //     created_at: [
  //       '',
  //       [
  //         Validators.required
  //       ]
  //     ],
  //     updated_by: [
  //       '',
  //       [
  //         Validators.required
  //       ]
  //     ],
  //     updated_at: [
  //       '',
  //       [
  //         Validators.required
  //       ]
  //     ]
  //   });

  //   console.log(this.chat.topic)
    
    
  // }

  // get topic() { return this.myForm.get('topic');}
  // get description() { return this.myForm.get('description');}
  // get id_status() { return this.myForm.get('id_status');}
  // get id_user() { return this.myForm.get('id_user');}
  // get created_by() { return this.myForm.get('created_by');}
  // get created_at() { return this.myForm.get('created_at');}
  // get updated_by() { return this.myForm.get('updated_by');}
  // get updated_at() { return this.myForm.get('updated_at');}


  // contactSubscription: Subscription
  // chatUpdate(): void {
  //   const id = this.activatedRoute.snapshot.params.id;
  //   if(this.contactSubscription != undefined) (this.contactSubscription.unsubscribe());
  //   this.contactSubscription = this.chatService.updateChat(id, this.myForm.value).subscribe(
  //     (data:any) => {
  //       console.log('chat actualizado : ', data);
  //       this.router.navigate(["./dashboard/chat/index"])
  //     },
  //     (error:any) => {
  //       console.log('chat error : ', error);
  //     }
  //   );
  // }

}
