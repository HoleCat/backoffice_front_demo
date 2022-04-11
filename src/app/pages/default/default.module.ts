import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { AppNavigationModule } from 'src/app/shared/app-navigation/app-navigation.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    AppNavigationModule
  ]
})
export class DefaultModule { }
