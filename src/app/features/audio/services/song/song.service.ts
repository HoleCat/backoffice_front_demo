import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  $songs = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) {}

  _show_song(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.get('https://localhost:44389/api/song/'+obj._id);
  }

  _update_song(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.patch('https://localhost:44389/api/song/'+obj._id, obj.data);
  }

  _destroy_song(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.delete('https://localhost:44389/api/song/'+obj._id);
  }

  _add_song(obj:any):Observable<any>{
    //here i need to add a post request
    return this.http.post('https://localhost:44389/api/song', obj);
  }

  _get_song(obj:any) {
    console.log('data para get ', obj);
    this.http.get<any[]>('https://localhost:44389/api/song', {params: obj}).toPromise().then((result:any) => { this.$songs.next(result); });
  }
}
