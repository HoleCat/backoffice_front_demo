import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../interfaces/JwtDto';
import { LoginUser } from '../interfaces/LoginUser';
import { NewUser } from '../interfaces/NewUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(
    private httpClient: HttpClient
  ){}

  public nuevo(newUser: NewUser): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'new', newUser);
  }

  public login(loginUser: LoginUser): Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authURL + "login", loginUser);
  }
}
