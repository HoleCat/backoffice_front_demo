import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Option_type } from '../interfaces/Option_type';

@Injectable({
  providedIn: 'root'
})
export class OptionTypeService {

  constructor(private httpClient: HttpClient) { }

  public listOption_type(): Observable<Option_type[]> {
    return this.httpClient.get<Option_type[]>(`http://localhost:8092/option_type/list`);
  }
}
