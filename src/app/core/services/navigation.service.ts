import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private sideBarOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public sideBarOpen$: Observable<boolean> = this.sideBarOpen.asObservable();
  constructor() { }
  setSideBarOpen(flag:boolean){
    this.sideBarOpen.next(flag);
  }
}
