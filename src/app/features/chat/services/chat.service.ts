import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Files } from 'src/app/features/my-chat/interfaces/File';
import { Answer } from '../interfaces/Answer';
import { Chat } from '../interfaces/Chat';
import { Chatbot } from '../interfaces/Chatbot';
import { Message } from '../interfaces/Message';
import { Question } from '../interfaces/Question';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chat: BehaviorSubject<Chat> = new BehaviorSubject<Chat>({
    id: 0,
    topic: '',
    description: '',
    status: null,
    user: null,
    sender_name: '',
    receive_name: '',
    created_by: null,
    created_at: null,
    updated_by: null,
    updated_at: null
  });
  public chat$ = this.chat.asObservable();

  constructor(private httpClient: HttpClient) { }

  setChat(chat: Chat){
    this.chat.next(chat);
  }

  //Para Chat
  public listChats(): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>('http://localhost:8092/chat/list');
  }

  public listChatsByStatus(status: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8092/chat/listByStatus/${status}`);
  }

  public chatByToken(token: string): Observable<Chat> {
    return this.httpClient.get<Chat>(`http://localhost:8092/chat/detailByToken/${token}`);
  }

  public detailChat(id: number): Observable<Chat> {
    return this.httpClient.get<Chat>('http://localhost:8092/chat/detail/'+ id);
  }

  public saveChat(obj: Chat): Observable<any>{
    return this.httpClient.post('http://localhost:8092/chat/create', obj);
  }

  public updateChat(id: number, obj: Chat): Observable<any>{
    return this.httpClient.put('http://localhost:8092/chat/update/' + id, obj);
  }

  // Para Message
  public saveMessage(obj:Message):Observable<any>{
    return this.httpClient.post('http://localhost:8092/message/create', obj);
  }

  public listMessagesByChat(id: number): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`http://localhost:8092/message/list/${id}`);
  }

  //Para chatbot
  public listChatbot(): Observable<Chatbot[]> {
    return this.httpClient.get<Chatbot[]>(`http://localhost:8092/chatbot/list`);
  }

  public chatbotPublicado(): Observable<Chatbot> {
    return this.httpClient.get<Chatbot>(`http://localhost:8092/chatbot/publicado`);
  }

  public listChatbotById(id: number): Observable<Chatbot> {
    return this.httpClient.get<Chatbot>(`http://localhost:8092/chatbot/detail/${id}`);
  }

  //Para question
  public detailQuestion(id: number): Observable<Question> {
    return this.httpClient.get<Question>(`http://localhost:8092/question/detail/${id}`);
  }

  //Para Answer
  public saveAnswer(obj: Answer): Observable<any>{
    return this.httpClient.post('http://localhost:8092/answer/create', obj);
  }

  public deleteAnswer(id: number): Observable<any>{
    return this.httpClient.delete<any>(`http://localhost:8092/answer/delete/${id}`);
  }

  //Para mailAdmin
  public sendMailAdmin(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8092/chat/sendMailAdmin`);
  }

  //Para user
  public userByToken(token: string): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:8092/auth/byToken/${token}`);
  }

  public detailUser(id: number): Observable<User>{
    return this.httpClient.get<User>(`http://localhost:8092/auth/detail/${id}`)
  }

  //Para File
  public saveFile(obj: Files): Observable<any>{
    return this.httpClient.post('http://localhost:8092/file/create', obj);
  }
  

}
