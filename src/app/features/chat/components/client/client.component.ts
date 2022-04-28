import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            // style({ height: 0, opacity: 0 }),
            style({ opacity: 0 }),
            animate('1.2s ease-out', 
                    style({ opacity: 1 }))
                    // style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            //style({ height: 300, opacity: 1 }),
            style({ opacity: 1 }),
            animate('1.2s ease-in', 
                    style({ opacity: 0 }))
                    // style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ClientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  chat_view_flag: boolean = false;

  page_index: number = 0;

  presentation_event():void {
    this.page_index = 1;
  }

  chat_bot_event():void {
    this.page_index = 2;
  }

  chat_event():void {
    this.page_index = 3;
  }

  review_event():void {
    this.page_index = 4;
  }

  end_event():void {
    this.page_index = 5;
  }

  again_event():void {
    this.page_index = 3;
  }

}
