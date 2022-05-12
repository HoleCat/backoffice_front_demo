import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/features/chat/interfaces/Chat';
import { ChatService } from 'src/app/features/chat/services/chat.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  chats: Chat[] = [];

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    console.log('index ya cargó');
    this.cargarChats();
    
  }

  cargarChats(): void {
    this.chatService.listChats().subscribe(
      data => {
        this.chats = data;
      },
      err => {
        console.log(err);
      }
    );
  }


}
