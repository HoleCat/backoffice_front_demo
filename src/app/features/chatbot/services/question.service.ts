import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  //Para chatbot
  public listQuestion(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`http://localhost:8092/question/list`);
  }
}
