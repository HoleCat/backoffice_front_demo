import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../interfaces/Chat';

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

  saveChat(obj: Chat): Observable<any>{
    return this.httpClient.post('http://localhost:8092/chat/create', obj);
  }
}
