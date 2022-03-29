import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  contact(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.post('http://asiacampoback.acidjelly.com/asiacampo/asiacampowebcontact', obj);
  }

}
