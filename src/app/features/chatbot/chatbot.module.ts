import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatbotRoutingModule } from './chatbot-routing.module';
import { IndexComponent } from './components/index/index.component';
import { CreateComponent } from './components/create/create.component';
import { ShowComponent } from './components/show/show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    ChatbotRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ]
})
export class ChatbotModule { }
