import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExampleFormComponent } from '../example-form/example-form.component';

@Component({
  selector: 'app-example-wrapper',
  templateUrl: './example-wrapper.component.html',
  styleUrls: ['./example-wrapper.component.scss']
})
export class ExampleWrapperComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  _create_example() {
    console.log('oe');
    const createdialogref = this.dialog.open(ExampleFormComponent);
    createdialogref.afterClosed().subscribe(data => {
      console.log('data from modal', data);
    });
  }

}
