import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-modal-contact-response',
  templateUrl: './modal-contact-response.component.html',
  styleUrls: ['./modal-contact-response.component.scss']
})
export class ModalContactResponseComponent implements OnInit,OnDestroy {

  dark: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModalContactResponseComponent>,
    private themeservice: ThemeService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  themeservicesubscription: Subscription;
  ngOnInit(): void {
    if(this.themeservicesubscription != undefined){
      this.themeservicesubscription.unsubscribe();
    } else {
      this.themeservice.dark$.subscribe(
        (dark:boolean) => {
          this.dark = dark;
        } 
      )
    }
  }

  ngOnDestroy(){
    this.themeservicesubscription.unsubscribe();
  }

}
