import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { Chatbot } from '../../interfaces/Chatbot';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  //LISTBYID_USER
  chatbots: Chatbot[] = [];

  //LOGGEO
  isLogged = false;
  userName = ''

  constructor(
    private chatbotService: ChatbotService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    console.log('index ya cargó');

    //cuando estes logueado o no
    if (this.tokenService.getToken()) {
      this.cargarChatbots();
      
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.userName = '';
    }
  }

  cargarChatbots(): void {
    this.chatbotService.listChatbot().subscribe(
      data => {
        this.chatbots = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
