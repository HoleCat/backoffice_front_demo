import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from '../../directives/interfaces/Chat';
import { ChatService } from '../../directives/services/chat.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  myForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  chat: Chat = {
    topic: "hola",
    description: "hola",
    id_status: 1,
    id_user: 1,
    created_by: 1,
    created_at: "2022-04-02T02:50:12.208Z",
    updated_by: 1,
    updated_at: "2022-04-02T02:50:12.208Z"
  }

  contactSubscription: Subscription
  chatregister(): void{
    if(this.contactSubscription != undefined) (this.contactSubscription.unsubscribe());
    this.contactSubscription = this.chatService.saveChat(this.chat).subscribe(
      (data:any) => {
        console.log('chat error : ', data);
      },
      (error:any) => {
        console.log('chat error : ', error);
      }
    );
  }
  
}
