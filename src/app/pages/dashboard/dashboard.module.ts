import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AppNavigationModule } from 'src/app/shared/app-navigation/app-navigation.module';
import { AppDisplayModule } from 'src/app/shared/app-display/app-display.module';


@NgModule({
  declarations: [
    WrapperComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppDisplayModule,
    AppNavigationModule
  ]
})
export class DashboardModule { }
