import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierBasicComponent } from './notifier-basic/notifier-basic.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [NotifierBasicComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    NotifierBasicComponent
  ]
})
export class NotifierModule { }
