import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { ChatService } from '../../directives/services/chat.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chat } from 'src/app/features/my-chat/interfaces/Chat';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  //LISTBYID_USER
  chats: Chat[] = [];
  
  //LOGGEO
  isLogged = false;
  userName = ''

  constructor(
    private chatService: ChatService,
    private tokenService : TokenService
  ) { }

  ngOnInit(): void {
    console.log('index ya cargó');

    //cuando estes logueado o no
    if (this.tokenService.getToken()) {
      this.cargarChats();
      
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.userName = '';
    }
  }

  cargarChats(): void {
    this.chatService.listChats(1).subscribe(
      data => {
        this.chats = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  //DESLOGEARSE
  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}