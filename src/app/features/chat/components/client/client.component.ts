import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/core/interfaces/LoginUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { DocumentTypeService } from 'src/app/core/services/document_type.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Chatbot } from '../../interfaces/Chatbot';
import { Chatbot_question } from '../../interfaces/Chatbot_question';
import { Document_type } from 'src/app/core/interfaces/Document_type';
import { Question_options } from '../../interfaces/Question_options';
import { Status } from '../../interfaces/Status';
import { ChatService } from '../../services/chat.service';
import { Options } from '../../interfaces/Options';
import { Answer } from '../../interfaces/Answer';
import { Question } from '../../interfaces/Question';
import { element } from 'protractor';
import { Chat } from '../../interfaces/Chat';
import { MessageClientComponent } from '../message-client/message-client.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            // style({ height: 0, opacity: 0 }),
            style({ opacity: 0 }),
            animate('1.2s ease-out', 
                    style({ opacity: 1 }))
                    // style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            //style({ height: 300, opacity: 1 }),
            style({ opacity: 1 }),
            animate('1.2s ease-in', 
                    style({ opacity: 0 }))
                    // style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ClientComponent implements OnInit {

  answers: Answer[] = [];
  questions: Question[] = [];
  buttonChatbot: boolean = false;
  buttonNext: boolean = true;
  buttonBefore: boolean = false;
  currentDate = new Date();

  findChat: boolean = false;

  constructor(
    private chatService: ChatService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private document_typeService: DocumentTypeService
  ) { }

  chat: Chat =  {
    id: 0,
    topic: '',
    description: '',
    status: null,
    user: null,
    sender_name: '',
    receive_name: '',
    created_by: null,
    created_at: this.currentDate,
    updated_by: null,
    updated_at: this.currentDate
  };

  chatServiceSubscription: Subscription;
  ngOnInit(): void {
    this.chatServiceSubscription = this.chatService.chat$.subscribe(
      (data:any) => {
        this.chat = data;
      }
    );
    if(this.tokenService.getToken()){
      this.logging = false;
      this.presentation_event();
      
      this.chatService.chatByToken(this.tokenService.getToken()).subscribe(
        data => {
          if(data != null){
            this.findChat = true;
            this.chatService.setChat(data);
            //this.chat = data;
            this.chat_bot_event();
          }
          else{
            this.findChat = false;
          }
        },
        error => {
          console.log(error);
        }
      );      
    }
  }

  //Form State
  loading = false;
  success = false;
  register = false;
  logging = true;
  sign_in = false;
  sign_up = false;

  chat_view_flag: boolean = false;

  page_index: number = 0;

  question_index: number = 0;

  option_index: number = 0;

  selected = -1;

  presentation_event():void {
    this.page_index = 1;
    this.cargarChatbots();
  }

  chat_bot_event():void {
    this.page_index = 2;
    this.cargarChatbots();
  }

  chat_event():void {
    this.page_index = 3;
  }

  review_event():void {
    this.page_index = 4;
  }

  end_event():void {
    this.page_index = 5;
  }

  again_event():void {
    this.page_index = 3;
  }

  registrar(){
    this.register = true;
    this.logging = false;
  }

  options: Options = {
    id: 0,
    description: '',
    order_number: 0,
    created_by: 0,
    created_at: '',
    updated_by: 0,
    updated_at: '',
    option_type: null
  }

  status: Status = {
    id: 1,
    description: '',
    created_by: 0,
    created_at: '',
    updated_by: 0,
    updated_at: '',
    status_type: null
  }

  answer: Answer = {
    id: 0,
    description: '',
    created_by: 1,
    created_at: this.currentDate,
    updated_by: 1,
    updated_at: this.currentDate,
    value1: '',
    value2: 0,
    value3: false,
    status: this.status,
    options: null
  }

  chatbots: Chatbot = {
    id: 0,
    topic: '',
    description: '',
    status: undefined,
    user: undefined,
    created_by: 0,
    created_at: '',
    updated_by: 0,
    updated_at: '',
    questions: []
  }

  backQuestion(id:number): void{
    console.log("back");
    if(id-1 == 0)
    {
      this.buttonBefore = false;   
    }
    else
    {
      this.buttonNext = true;   
    };
    this.question_index = id-1;
    console.log(this.answers[id-1].id);
    this.chatService.deleteAnswer(this.answers[id-1].id).subscribe(
      data => {
        console.log(data);
        console.log("borrado");
      },
      err => {
        console.log(err);
      }
    );
  }

  nextQuestion(id:number): void{
    console.log("next");

    if(id+1 > 0)
    {
      this.buttonBefore = true;
    };

    if(id+1 == this.questions.length-1)
    {
      this.buttonChatbot = true;
      this.buttonNext = false;
    };
    this.answer.value1 = this.options.description;
    this.answer.options = this.options;
    this.chatService.saveAnswer(this.answer).subscribe(
      data => {
        console.log(data);
        this.answer = data;
        this.answers.push(this.answer);
      },
      err => {
        console.log(err);
      }
    );
    this.question_index = id+1;
  }

  //Para chatbot
  cargarChatbots(): void {
    this.chatService.chatbotPublicado().subscribe(
      data => {
        this.chatbots = data;
        this.questions = this.chatbots.questions;

        console.log(this.questions);
      },
      err => {
        console.log(err);
      }
    );
  }

  onOptionPressed(checked: boolean,option: Options){
    if (checked) {
      console.log(option);
      this.options = option;
    } 
  }
}
