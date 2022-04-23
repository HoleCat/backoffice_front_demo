import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question_type } from '../interfaces/Question_type';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {

  constructor(private httpClient: HttpClient) { }

  //Para chatbot
  public listQuestion_type(): Observable<Question_type[]> {
    return this.httpClient.get<Question_type[]>(`http://localhost:8092/question_type/list`);
  }
}
