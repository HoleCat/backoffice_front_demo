import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ThemeService } from '../../services/theme/theme.service';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavlinkService } from '../../services/navlink/navlink.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit, OnDestroy {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeservice: ThemeService,
    private navlinkservice: NavlinkService
  ) {}

  themeservicesubscription:Subscription;
  navlinkservicelinkssubscription:Subscription;
  navlinkservicelinksubscription:Subscription;
  ngOnInit(){
    console.log('no se que hacer aqui');
    if(this.themeservicesubscription != undefined){
      this.themeservicesubscription.unsubscribe();
    } else {
      this.themeservicesubscription = this.themeservice.dark$.subscribe(
        (dark) => {
          console.log('subscription to theme => ', dark);
          this.dark = dark;
        }
      )
    }
    if(this.navlinkservicelinkssubscription != undefined){
      this.navlinkservicelinkssubscription.unsubscribe();
    } else {
      this.navlinkservicelinkssubscription = this.navlinkservice.links$.subscribe(
        (links) => {
          this.links = links
        }
      )
    }
    if(this.navlinkservicelinksubscription != undefined){
      this.navlinkservicelinksubscription.unsubscribe();
    } else {
      this.navlinkservicelinksubscription = this.navlinkservice.link$.subscribe(
        (link) => {
          this.link = link
        }
      )
    }
  }

  ngOnDestroy(){
    this.themeservicesubscription.unsubscribe();
    this.navlinkservicelinkssubscription.unsubscribe();
    this.navlinkservicelinksubscription.unsubscribe();
  }

  go_to(link){
    this.navlinkservice.go_to(link);
  }

  isExpanded: Boolean = false;
  isCollapsed: Boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  dark: boolean = false;
  
  change_dark(dark){
    this.themeservice.set_dark(dark);
  }

  links: any[];

  link: any;

  change_link(link){
    this.navlinkservice.set_link(link);
  }
}
