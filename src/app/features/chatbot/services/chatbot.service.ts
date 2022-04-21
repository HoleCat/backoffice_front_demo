import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chatbot } from '../interfaces/Chatbot';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private httpClient: HttpClient) { }

  //Para chatbot
  public listChatbot(): Observable<Chatbot[]> {
    return this.httpClient.get<Chatbot[]>(`http://localhost:8092/chatbot/list`);
  }
}
