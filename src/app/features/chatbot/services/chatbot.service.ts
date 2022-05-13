import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chatbot } from '../interfaces/Chatbot';
import { Chatbot_question } from '../interfaces/Chatbot_question';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private httpClient: HttpClient) { }

  //Para chatbot
  public listChatbot(): Observable<Chatbot[]> {
    return this.httpClient.get<Chatbot[]>(`http://localhost:8092/chatbot/listByPage`);
  }


  public listChatbotById(id: number): Observable<Chatbot> {
    return this.httpClient.get<Chatbot>(`http://localhost:8092/chatbot/detail/${id}`);
  }


  public saveChatbotQuestion(obj: Chatbot_question): Observable<any>{
    return this.httpClient.post('http://localhost:8092/chatbot_question/create', obj);
  }
  
}
