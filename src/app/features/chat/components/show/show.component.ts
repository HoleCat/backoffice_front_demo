import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from '../../directives/interfaces/Chat';
import { ChatService } from '../../directives/services/chat.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  chat: Chat = null;
  myForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id);
    this.chatService.detail(id).subscribe(
      data => {
        this.chat = data;
        console.log(data);

        this.myForm.controls['topic'].setValue(this.chat.topic);
        this.myForm.controls['description'].setValue(this.chat.description);
        this.myForm.controls['id_status'].setValue(this.chat.id_status);
        this.myForm.controls['id_user'].setValue(this.chat.id_user);
        this.myForm.controls['created_by'].setValue(this.chat.created_by);
        this.myForm.controls['created_at'].setValue(this.chat.created_at);
        this.myForm.controls['updated_by'].setValue(this.chat.updated_by);
        this.myForm.controls['updated_at'].setValue(this.chat.updated_at);
      },
      err => {
        console.log(err);
      }
    );

    this.myForm = this.fb.group({
      
      topic: [
        '',
        [
          Validators.required
        ]
      ],
      description: [
        '',
        [
          Validators.required
        ]
      ],
      id_status: [
        '',
        [
          Validators.required
        ]
      ],
      id_user: [
        '',
        [
          Validators.required
        ]
      ],
      created_by: [
        '',
        [
          Validators.required
        ]
      ],
      created_at: [
        '',
        [
          Validators.required
        ]
      ],
      updated_by: [
        '',
        [
          Validators.required
        ]
      ],
      updated_at: [
        '',
        [
          Validators.required
        ]
      ]
    });

    console.log(this.chat.topic)
    
    
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
  chatUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    if(this.contactSubscription != undefined) (this.contactSubscription.unsubscribe());
    this.contactSubscription = this.chatService.updateChat(id, this.myForm.value).subscribe(
      (data:any) => {
        console.log('chat actualizado : ', data);
        this.router.navigate(["./dashboard/chat/index"])
      },
      (error:any) => {
        console.log('chat error : ', error);
      }
    );
  }

}
