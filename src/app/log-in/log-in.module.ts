import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogInRoutingModule } from './log-in-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LogInRoutingModule
  ]
})
export class LogInModule { }
