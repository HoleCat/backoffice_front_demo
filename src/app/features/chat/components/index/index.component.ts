import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { ChatService } from '../../services/chat.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chat } from '../../interfaces/Chat';
import { Page } from '../../interfaces/Page';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  pages: Page = {
    content: [],
    pageable: null,
    last: false,
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
    sort: null,
    first: false,
    numberOfElements: 0,
    empty: false
  };
  chats: Chat[] =[];

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    console.log('index ya cargó');
    this.cargarChats();
    
  }

  cargarChats(): void {
    this.chatService.listChatsByStatus(2, 0, 1).subscribe(
      data => {
        this.pages = data;
        console.log(this.chats);
      },
      err => {
        console.log(err);
      }
    );
  }

}