import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/core/interfaces/LoginUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { DocumentTypeService } from 'src/app/core/services/document_type.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Chatbot } from '../../directives/interfaces/Chatbot';
import { Chatbot_question } from '../../directives/interfaces/Chatbot_question';
import { Document_type } from 'src/app/core/interfaces/Document_type';
import { Question_options } from '../../directives/interfaces/Question_options';
import { Status } from '../../directives/interfaces/Status';
import { ChatService } from '../../directives/services/chat.service';
import { Options } from '../../directives/interfaces/Options';
import { Answer } from '../../directives/interfaces/Answer';
import { Question } from '../../directives/interfaces/Question';
import { element } from 'protractor';

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

  optiones: Options[] = [];
  questions: Question[] = [];

  constructor(
    private chatService: ChatService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private document_typeService: DocumentTypeService
  ) { }


  ngOnInit(): void {
     
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
  }

  chat_event():void {
    this.page_index = 3;
    this.cargarChatbots();
    // this.PrepareQuestions(1);
  }

  review_event():void {
    this.cargarChatbots();
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
    id: 2,
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
    created_by: 0,
    created_at: '',
    updated_by: 0,
    updated_at: '',
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

  nextQuestion(id:number): void{
    console.log(this.options);
    this.answer.value1 = this.options.description;
    this.answer.options = this.options;
    console.log(this.answer);
    this.chatService.saveAnswer(this.answer).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );;
    this.question_index = id+1;
  }

  nextOption(id:number): void{
    this.option_index = id+1;
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

  onOptionPressed(checked: boolean,options: Options){
    if (checked) {
      console.log(options);
      this.options = options;
    } 
  }

  // PrepareQuestions(id: number): void {
    
  //   this.chatService.listQuestionByChatbot(id).subscribe(
  //     data => {
  //       this.chatbot_questions = data;
  //       this.cargarOptions(1);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  // cargarQuestions(id: number): void {
    
  //   this.chatService.listQuestionByChatbot(id).subscribe(
  //     data => {
  //       this.chatbot_questions = data;
  //       this.cargarOptions(1);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  // cargarOptions(id: number): void {
  //   this.chatService.listOptionByQuestion(id).subscribe(
  //     data => {
  //       this.question_options = data;
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

}
