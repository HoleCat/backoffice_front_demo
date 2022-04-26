import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/features/home/services/theme/theme.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  constructor(
    private themeservice: ThemeService
  ) { }

  themeservicesubscription:Subscription;
  ngOnInit(): void {
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
  }

  dark: boolean = false;

}
