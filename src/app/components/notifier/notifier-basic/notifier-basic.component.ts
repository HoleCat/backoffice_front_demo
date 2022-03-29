import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifier-basic',
  templateUrl: './notifier-basic.component.html',
  styleUrls: ['./notifier-basic.component.css']
})
export class NotifierBasicComponent implements OnInit {

  constructor
  (
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<NotifierBasicComponent>
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.snackBarRef.dismiss();
  }

}
