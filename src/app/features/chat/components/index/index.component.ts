import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  userName = ''

  constructor(
    private tokenService : TokenService
  ) { }

  ngOnInit(): void {
    console.log('index ya cargó');

    //cuando estes logueado o no
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.userName = '';
    }
  }

  //DESLOGEARSE
  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}
