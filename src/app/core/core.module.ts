import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToUpperCasePipe } from './pipes/to-upper-case.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ToUpperCasePipe
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
