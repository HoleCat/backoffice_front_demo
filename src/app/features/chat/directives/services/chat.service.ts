import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../interfaces/Chat';
import { Message } from '../interfaces/Message';

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


}
