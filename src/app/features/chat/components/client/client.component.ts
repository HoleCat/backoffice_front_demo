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

  //Para Chatbot
  chatbots: Chatbot[] = [];
  chatbot_questions: Chatbot_question[] = [];
  question_options: Question_options[] = [];

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
  disable = false;

  presentation_event():void {
    this.page_index = 1;
    this.cargarChatbots();
  }

  chat_bot_event():void {
    this.page_index = 2;
  }

  chat_event():void {
    this.page_index = 3;
    this.PrepareQuestions(1);
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

  nextQuestion(id:number): void{
    this.question_index = id+1;
  }

  nextOption(id:number): void{
    this.option_index = id+1;
  }

  //Para chatbot
  cargarChatbots(): void {
    this.chatService.listChatbot().subscribe(
      data => {
        this.chatbots = data;
        this.cargarQuestions(1);
      },
      err => {
        console.log(err);
      }
    );
  }

  isDisabled: boolean = false;

  onOptionPressed(checked: boolean){
    if (checked) { //Si el elemento fue seleccionado
      
    } else { 
      this.isDisabled =true;
    }
  }



  PrepareQuestions(id: number): void {
    
    this.chatService.listQuestionByChatbot(id).subscribe(
      data => {
        this.chatbot_questions = data;
        this.cargarOptions(1);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarQuestions(id: number): void {
    
    this.chatService.listQuestionByChatbot(id).subscribe(
      data => {
        this.chatbot_questions = data;
        this.cargarOptions(1);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarOptions(id: number): void {
    this.chatService.listOptionByQuestion(id).subscribe(
      data => {
        this.question_options = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
