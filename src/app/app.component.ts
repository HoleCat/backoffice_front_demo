import { Component, OnInit } from '@angular/core';
import { User } from './core/interfaces/User';
//import { OverlayContainer } from '@angular/cdk/overlay';
//import { HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isCollapsed = false;

  user:User = {
    id: 0,
    created_at: undefined,
    created_by: 0,
    document_number: '',
    document_type: '',
    email: '',
    id_status: 0,
    last_name: '',
    name: '',
    password: '',
    phone: '',
    photo: '',
    updated_at: undefined,
    updated_by: 0,
    user_name: '',
    id_document_type: 0
  }

  ngOnInit(): void {
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }
  /*@HostBinding('class') componentCssClass: any;
  constructor(public overlayContainer: OverlayContainer){}
  public onSetTheme(e: string){
    this.overlayContainer.getContainerElement().classList.add(e);
  }*/
}
