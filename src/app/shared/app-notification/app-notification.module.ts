import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicNotificationComponent } from './components/basic-notification/basic-notification.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    BasicNotificationComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ]
})
export class AppNotificationModule { }
