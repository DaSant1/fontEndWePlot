import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { LogInRoutingModule } from './log-in-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import { OptinalLogInComponent } from './forms/optinal-log-in/optinal-log-in.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    LoginComponent,
    OptinalLogInComponent
  ],
  imports: [
    CommonModule,
    LogInRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    NgbModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class LogInModule { }
