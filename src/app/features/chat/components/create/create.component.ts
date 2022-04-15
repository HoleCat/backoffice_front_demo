import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from '../../directives/interfaces/Chat';
import { ChatService } from '../../directives/services/chat.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  myForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      
      topic: [
        'hola amigos',
        [
          Validators.required
        ]
      ],
      description: [
        'whatever',
        [
          Validators.required
        ]
      ],
      id_status: [
        '1',
        [
          Validators.required
        ]
      ],
      id_user: [
        '1',
        [
          Validators.required
        ]
      ],
      created_by: [
        '1',
        [
          Validators.required
        ]
      ],
      created_at: [
        '2022-04-02T02:50:12.208Z',
        [
          Validators.required
        ]
      ],
      updated_by: [
        '1',
        [
          Validators.required
        ]
      ],
      updated_at: [
        '2022-04-02T02:50:12.208Z',
        [
          Validators.required
        ]
      ]
    });
  }

  get topic() { return this.myForm.get('topic');}
  get description() { return this.myForm.get('description');}
  get id_status() { return this.myForm.get('id_status');}
  get id_user() { return this.myForm.get('id_user');}
  get created_by() { return this.myForm.get('created_by');}
  get created_at() { return this.myForm.get('created_at');}
  get updated_by() { return this.myForm.get('updated_by');}
  get updated_at() { return this.myForm.get('updated_at');}


  contactSubscription: Subscription
  chatregister(): void{
    if(this.contactSubscription != undefined) (this.contactSubscription.unsubscribe());
    this.contactSubscription = this.chatService.saveChat(this.myForm.value).subscribe(
      (data:any) => {
        console.log('chat registrado : ', data);
        this.router.navigate(["./dashboard/chat/index"])
      },
      (error:any) => {
        console.log('chat error : ', error);
      }
    );
  }

}
