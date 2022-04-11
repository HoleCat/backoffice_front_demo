import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExampleDataService {

  constructor(
    private http: HttpClient
  ) {}

  _show_example_data(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.get('http://localhost:3000/users/'+obj._id);
  }

  _update_example_data(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.patch('http://localhost:3000/users/'+obj._id, obj.data);
  }

  _destroy_example_data(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.delete('http://localhost:3000/users/'+obj._id);
  }

  _add_example_data(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.post('http://localhost:3000/users', obj);
  }

  _get_example_data(obj:any):Observable<any[]>{
    console.log('data para get ', obj);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: obj
    };
    //return this.http.get<any[]>('https://localhost:3000/users', {params: obj});
    return this.http.post<any[]>('https://localhost:44389/api/users/list', obj);
  }
}
