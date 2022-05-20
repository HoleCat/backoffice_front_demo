import { Component, OnInit, ViewChild } from '@angular/core';
import { Chat } from 'src/app/features/chat/interfaces/Chat';
import { ChatService } from 'src/app/features/chat/services/chat.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  chats: Chat[] = [];

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    console.log('index ya cargó');
    this.cargarChats();
    
  }

  displayedColumns: any[] = ['id','topic','description']

  PageEvent($event) {
    console.log("hola");
    alert($event);
  }

  cargarChats(): void {
    this.chatService.listChatsByStatus(3).subscribe(
      data => {
        this.chats = data;
      },
      err => {
        console.log(err);
      }
    );
  }


}
