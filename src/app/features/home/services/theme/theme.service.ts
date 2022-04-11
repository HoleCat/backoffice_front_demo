import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private dark = new BehaviorSubject<boolean>(true);

  dark$:Observable<boolean> = this.dark.asObservable();

  constructor() {}

  set_dark(dark){
    this.dark.next(dark);
  }

}
