import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(
    private http: HttpClient
  ) {}

  _show_line(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.get('https://localhost:44389/api/line/'+obj._id);
  }

  _update_line(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.patch('https://localhost:44389/api/line', obj.data);
  }

  _destroy_line(obj:any):Observable<any>{
    //here i need to add a post request
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: obj
    };
    return this.http.delete('https://localhost:44389/api/line', httpOptions);
  }

  _add_line(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.post('https://localhost:44389/api/line', obj);
  }

  _get_line(obj:any):Observable<any[]>{
    console.log('data para get ', obj);
    return this.http.get<any[]>('https://localhost:44389/api/line', {
      params: obj
    });
  }
}
