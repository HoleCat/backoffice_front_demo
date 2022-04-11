import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-basic-notification',
  templateUrl: './basic-notification.component.html',
  styleUrls: ['./basic-notification.component.css']
})
export class BasicNotificationComponent implements OnInit {

  constructor
  (
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<BasicNotificationComponent>
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.snackBarRef.dismiss();
  }

}
