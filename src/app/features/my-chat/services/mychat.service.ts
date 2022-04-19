import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../interfaces/Chat';
import { Files } from '../interfaces/File';
import { Message } from '../interfaces/Message';

@Injectable({
  providedIn: 'root'
})
export class MyChatService {


  constructor(private httpClient: HttpClient) { }


  public listMessage(username: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`http://localhost:8092/messages/lista/${username}`);
  }

  saveMessage(obj:Message):Observable<any>{
    //here i need to add a post request
    return this.httpClient.post('http://localhost:8092/message/create', obj);
  }


  //Para chat
  public listChats(id_user: number): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(`http://localhost:8092/chat/list/${id_user}`);
  }

  public detail(id: number): Observable<Chat> {
    return this.httpClient.get<Chat>('http://localhost:8092/chat/detail/'+ id);
  }

  public saveChat(obj: Chat): Observable<any>{
    return this.httpClient.post('http://localhost:8092/chat/create', obj);
  }

  public updateChat(id: number, obj: Chat): Observable<any>{
    return this.httpClient.put('http://localhost:8092/chat/update/' + id, obj);
  }

  public saveFile(obj: Files): Observable<any>{
    return this.httpClient.post('http://localhost:8092/file/create', obj);
  }

  
}
