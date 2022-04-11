import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  sideBarOpen: boolean = false;
  mobileQuery: MediaQueryList;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public navigationService: NavigationService
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  sideBarOpenSubscription: Subscription;
  ngOnInit(): void {
    this.sideBarOpenSubscription = this.navigationService.sideBarOpen$.subscribe(
      (data:any) => {
        this.sideBarOpen = data;
        console.log('sideBarOpen data : ', data);
      },
      (error:any) => {
        console.log('sideBarOpen error: ', error);
      }
    )
  }

  sideBar() {
    this.navigationService.setSideBarOpen(!this.sideBarOpen);
  }

  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
