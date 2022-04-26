import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicNotificationComponent } from './components/basic-notification/basic-notification.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [
    BasicNotificationComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [
    MessageComponent
  ]
})
export class AppNotificationModule { }
