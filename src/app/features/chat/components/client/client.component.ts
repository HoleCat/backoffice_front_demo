import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Chatbot } from '../../directives/interfaces/Chatbot';
import { Chatbot_question } from '../../directives/interfaces/Chatbot_question';
import { Question_options } from '../../directives/interfaces/Question_options';
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

  chatbots: Chatbot[] = [];
  chatbot_questions: Chatbot_question[] = [];
  question_options: Question_options[] = [];

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  chat_view_flag: boolean = false;

  page_index: number = 0;

  presentation_event():void {
    this.page_index = 1;
    this.cargarChatbots();
  }

  chat_bot_event():void {
    this.page_index = 2;
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
