import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/features/my-chat/interfaces/Chat';
import { Chatbot } from '../interfaces/Chatbot';
import { Chatbot_question } from '../interfaces/Chatbot_question';
import { Message } from '../interfaces/Message';
import { Question_options } from '../interfaces/Question_options';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  public listChats(id_user: number): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(`http://localhost:8092/chat/list/${id_user}`);
  }

  // saveChat(obj: Chat):Observable<any> {
  //   return this.httpClient.post('http://localhost:8092/chat/create' + obj);
  // }

  public detail(id: number): Observable<Chat> {
    return this.httpClient.get<Chat>('http://localhost:8092/chat/detail/'+ id);
  }

  public saveChat(obj: Chat): Observable<any>{
    return this.httpClient.post('http://localhost:8092/chat/create', obj);
  }

  public updateChat(id: number, obj: Chat): Observable<any>{
    return this.httpClient.put('http://localhost:8092/chat/update/' + id, obj);
  }

  //Message
  saveMessage(obj:Message):Observable<any>{
    //here i need to add a post request
    return this.httpClient.post('http://localhost:8092/message/create', obj);
  }

  //Para chatbot
  public listChatbot(): Observable<Chatbot[]> {
    return this.httpClient.get<Chatbot[]>(`http://localhost:8092/chatbot/list`);
  }
  //Para chatbot
  public listQuestionByChatbot(id: number): Observable<Chatbot_question[]> {
    return this.httpClient.get<Chatbot_question[]>(`http://localhost:8092/chatbot_question/list/${id}`);
  }

  public listOptionByQuestion(id: number): Observable<Question_options[]> {
    return this.httpClient.get<Question_options[]>(`http://localhost:8092/question_options/list/${id}`);
  }


}
