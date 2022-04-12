import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/Message';

@Injectable({
  providedIn: 'root'
})
export class MyChatService {


  constructor(private httpClient: HttpClient) { }


  public listMessage(username: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`http://localhost:8092/messages/lista/${username}`);
  }

  savechat(obj:Message):Observable<any>{
    //here i need to add a post request
    return this.httpClient.post('http://localhost:8092/messages/create', obj);
  }

  
}
