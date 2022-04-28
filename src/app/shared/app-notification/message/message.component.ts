import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message:string = "";
  @Input() color = "primary";
  @Input() font_size:number = 12;
  constructor() { }

  ngOnInit(): void {
  }

}
