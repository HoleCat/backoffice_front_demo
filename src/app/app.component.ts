import { Component } from '@angular/core';
//import { OverlayContainer } from '@angular/cdk/overlay';
//import { HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  /*@HostBinding('class') componentCssClass: any;
  constructor(public overlayContainer: OverlayContainer){}
  public onSetTheme(e: string){
    this.overlayContainer.getContainerElement().classList.add(e);
  }*/
}
