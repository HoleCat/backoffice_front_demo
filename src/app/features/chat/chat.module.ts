import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { IndexComponent } from './components/index/index.component';
import { ShowComponent } from './components/show/show.component';
import { CreateComponent } from './components/create/create.component';
import { DeleteComponent } from './components/delete/delete.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ClientComponent } from './components/client/client.component';
import { MatIconModule } from '@angular/material/icon';
import { AppNotificationModule } from 'src/app/shared/app-notification/app-notification.module';
import { ClientMessagesComponent } from './client-messages/client-messages.component';

@NgModule({
  declarations: [
    WrapperComponent,
    IndexComponent,
    ShowComponent,
    CreateComponent,
    DeleteComponent,
    ClientComponent,
    ClientMessagesComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    AppNotificationModule
  ],
  exports: [
    ClientComponent
  ]
})
export class ChatModule { }
