import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  sign_up(obj: any): Observable<any>{
    console.log(obj);
    return this.httpClient.post('http://localhost:3000/users', obj);
  }

  get_users(obj: any) {
    return this.httpClient.get('http://localhost:3000/users', obj);
  }
}
