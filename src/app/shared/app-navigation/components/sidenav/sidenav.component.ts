import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItem } from 'src/app/core/interfaces/NavItem';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  isCollapsed: boolean = true;
  navItemList: NavItem[] = [
    {
      id: 1,
      text: 'Chats',
      route: '/chat/index',
      icon: 'person'
    },
    {
      id: 2,
      text: 'Mis chats',
      route: '/my-chat/index',
      icon: 'home'
    },
    {
      id: 3,
      text: 'Buzón',
      route: '/dashboard/inbox',
      icon: 'camera'
    }
  ];

  open() {
    this.isCollapsed = !this.isCollapsed;

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

}
