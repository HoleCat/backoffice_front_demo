import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { AppNavigationModule } from 'src/app/shared/app-navigation/app-navigation.module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ChatModule } from 'src/app/features/chat/chat.module';

@NgModule({
  declarations: [
    WrapperComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    AppNavigationModule,
    ChatModule
  ]
})
export class DefaultModule { }
