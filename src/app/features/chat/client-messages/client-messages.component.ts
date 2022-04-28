import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../my-chat/interfaces/Message';

@Component({
  selector: 'app-client-messages',
  templateUrl: './client-messages.component.html',
  styleUrls: ['./client-messages.component.css']
})
export class ClientMessagesComponent implements OnInit {
  @Input() user_id:number[] = [];
  @Input() messages:Message[] = [];
  constructor() { }
  user:any = null;    
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem(''));
    
  }

}
