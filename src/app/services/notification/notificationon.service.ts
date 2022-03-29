import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationonService {

  constructor(private httpClient: HttpClient) { }

  

  $add_notification(obj: any): Observable<any>{
    console.log(obj);
    return this.httpClient.post('http://localhost:3000/users', obj);
  }

  $notifications(obj: any) {
    return this.httpClient.get('http://localhost:3000/users', obj);
  }
}
