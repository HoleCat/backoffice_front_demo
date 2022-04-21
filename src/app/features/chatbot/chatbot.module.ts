import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatbotRoutingModule } from './chatbot-routing.module';
import { IndexComponent } from './components/index/index.component';
import { CreateComponent } from './components/create/create.component';
import { ShowComponent } from './components/show/show.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    ChatbotRoutingModule
  ]
})
export class ChatbotModule { }
