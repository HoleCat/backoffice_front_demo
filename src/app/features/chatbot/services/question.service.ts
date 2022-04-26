import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chatbot_question } from '../interfaces/Chatbot_question';
import { Question } from '../interfaces/Question';
import { Question_options } from '../interfaces/Question_options';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  //Para chatbot
  public listQuestionByChatbot(id: number): Observable<Chatbot_question[]> {
    return this.httpClient.get<Chatbot_question[]>(`http://localhost:8092/chatbot_question/list/${id}`);
  }

  public saveQuestion(obj: Question): Observable<any>{
    return this.httpClient.post('http://localhost:8092/question/create', obj);
  }

  public saveQuestionOptions(obj: Question_options): Observable<any>{
    return this.httpClient.post('http://localhost:8092/question_options/create', obj);
  }
  
}
