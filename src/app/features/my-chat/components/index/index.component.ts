import { Component, OnInit, ViewChild } from '@angular/core';
import { Chat } from 'src/app/features/chat/interfaces/Chat';
import { ChatService } from 'src/app/features/chat/services/chat.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from 'src/app/features/chat/interfaces/Page';
import { Filtro } from 'src/app/features/chat/interfaces/Filtro';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

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

  filtro: Filtro = {
    body: 3,
    page: 0,
    pageSize: 1
  }

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    console.log('index ya cargó');
    this.cargarChats(0, 1);
    
  }

  displayedColumns: any[] = ['id','topic','description', 'user', 'status']

  PageEvent($event) {

    this.cargarChats($event.pageIndex,$event.pageSize);
    console.log($event);
  }

  cargarChats(page: number, pageSize: number): void {
    // this.filtro.body = 3;
    // this.filtro.page = filtro.page;
    // this.filtro.pageSize = filtro.pageSize;
    this.chatService.listChatsByStatus(3, page, pageSize).subscribe(
      data => {
        this.pages = data;
        console.log(this.pages);
      },
      err => {
        console.log(err);
      }
    );
  }


}
