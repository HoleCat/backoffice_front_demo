import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyChatRoutingModule } from './my-chat-routing.module';
import { IndexComponent } from './components/index/index.component';
import { CreateComponent } from './components/create/create.component';
import { ShowComponent } from './components/show/show.component';
import { DeleteComponent } from './components/delete/delete.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    ShowComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    MyChatRoutingModule
  ]
})
export class MyChatModule { }
