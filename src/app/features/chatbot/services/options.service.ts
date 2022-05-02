import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../interfaces/Options';
import { Question_options } from '../interfaces/Question_options';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private httpClient: HttpClient) { }

  public listOptionByQuestion(id: number): Observable<Question_options[]> {
    return this.httpClient.get<Question_options[]>(`http://localhost:8092/question_options/list/${id}`);
  }

  public saveOption(obj: Options): Observable<any>{
    return this.httpClient.post('http://localhost:8092/options/create', obj);
  }

  public updateSubirOption(id: number, obj: Options): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:8092/options/updateSubir/${id}`, obj);
  }
  public updateBajarOption(id: number, obj: Options): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:8092/options/updateBajar/${id}`, obj);
  }
}
