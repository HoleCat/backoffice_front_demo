import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { ChatService } from '../../services/chat.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chat } from '../../interfaces/Chat';

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
    this.chatService.listChatsByStatus(2).subscribe(
      data => {
        this.chats = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}