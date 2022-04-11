import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasicNotificationComponent } from 'src/app/shared/app-notification/components/basic-notification/basic-notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(message,btntext,duration,horizontalPosition,verticalPosition) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    });
  }

  showNotificationCenter(message,btntext,duration,verticalPosition) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: verticalPosition
    });
  }

  showNotificationLeft(message,btntext,duration,verticalPosition) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: 'left',
      verticalPosition: verticalPosition
    });
  }

  showNotificationRight(message,btntext,duration,verticalPosition) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: 'left',
      verticalPosition: verticalPosition
    });
  }

  showNotificationTop(message,btntext,duration,horizontalPosition) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: 'top'
    });
  }

  showNotificationBottom(message,btntext,duration,horizontalPosition) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: 'bottom'
    });
  }

  showNotificationCenterBottom(message,btntext,duration) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  showNotificationLeftBottom(message,btntext,duration) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: 'left',
      verticalPosition: 'bottom'
    });
  }

  showNotificationRightBottom(message,btntext,duration) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  showNotificationCenterTop(message,btntext,duration) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  showNotificationLeftTop(message,btntext,duration) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: 'left',
      verticalPosition: 'top'
    });
  }

  showNotificationRightTop(message,btntext,duration) {
    this.snackBar.open(message,btntext,{
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  showNotificationDefault(message) {
    this.snackBar.open(message,'ok',{
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  showNotificationComponentDefault(message:string,buttontext:string,type: 'error' | 'success') {
    this.snackBar.openFromComponent(BasicNotificationComponent,{
      data: {
        message: message,
        buttontext: buttontext
      },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type
    });
  }
}
