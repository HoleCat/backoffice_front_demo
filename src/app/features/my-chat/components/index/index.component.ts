import { Component, OnInit } from '@angular/core';
import { ServerForm } from '../../interfaces/ServerForm';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  data: ServerForm = {
    server_name: '',
    user_name: '',
    message: '',
    flag: true
  }

  messages: any[] = [
    {
      user_name: 'crystal',
      text: 'lorem algo mundo xd',
      type: 'client'
    },
    {
      user_name: 'jorge',
      text: 'lorem algo mundo xd',
      type: 'server'
    },
    {
      user_name: 'crystal',
      text: 'lorem algo mundo xd',
      type: 'client'
    },
    {
      user_name: 'jorge',
      text: 'lorem algo mundo xd',
      type: 'server'
    },
    {
      user_name: 'crystal',
      text: 'lorem algo mundo xd',
      type: 'client'
    },
    {
      user_name: 'jorge',
      text: 'lorem algo mundo xd',
      type: 'server'
    },
    {
      user_name: 'crystal',
      text: 'lorem algo mundo xd',
      type: 'client'
    },
    {
      user_name: 'jorge',
      text: 'lorem algo mundo xd',
      type: 'server'
    },
    {
      user_name: 'crystal',
      text: 'lorem algo mundo xd',
      type: 'client'
    },
    {
      user_name: 'jorge',
      text: 'lorem algo mundo xd',
      type: 'server'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
