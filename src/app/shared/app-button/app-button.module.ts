import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicButtonComponent } from './components/basic-button/basic-button.component';
import { SmallButtonComponent } from './components/small-button/small-button.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { SmallIconButtonComponent } from './components/small-icon-button/small-icon-button.component';



@NgModule({
  declarations: [
    BasicButtonComponent,
    SmallButtonComponent,
    IconButtonComponent,
    SmallIconButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppButtonModule { }
