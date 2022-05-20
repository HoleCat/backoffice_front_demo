import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyChatRoutingModule } from './my-chat-routing.module';
import { IndexComponent } from './components/index/index.component';
import { CreateComponent } from './components/create/create.component';
import { ShowComponent } from './components/show/show.component';
import { DeleteComponent } from './components/delete/delete.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    ShowComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    MyChatRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MyChatModule { }
