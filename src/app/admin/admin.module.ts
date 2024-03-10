import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { InfoUsersComponent } from './pages/info-users/info-users.component';
import { InfoPreguntasComponent } from './pages/info-preguntas/info-preguntas.component';
import { InfoAdminsComponent } from './pages/info-admins/info-admins.component';
import { RouterModule } from '@angular/router';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DataTablesModule } from 'angular-datatables';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CreatePreguntaComponent } from './pages/create-pregunta/create-pregunta.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    SidebarComponent,
    InfoUsersComponent,
    InfoPreguntasComponent,
    InfoAdminsComponent,
    CreatePreguntaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    DataTablesModule,
    FormsModule,
    NgbModule,
    MatDatepickerModule
  ]
})
export class AdminModule { }
