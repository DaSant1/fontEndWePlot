import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoUsersComponent } from './pages/info-users/info-users.component';
import { InfoAdminsComponent } from './pages/info-admins/info-admins.component';
import { InfoPreguntasComponent } from './pages/info-preguntas/info-preguntas.component';
import { CreatePreguntaComponent } from './pages/create-pregunta/create-pregunta.component';
import { guardSessionGuard } from '../Guards/guard-session.guard';

const routes: Routes = [
  {
    path:'Users',
    component:InfoUsersComponent,
    canActivate:[guardSessionGuard]
  },
  {
    path:'InfoAdmins',
    component:InfoAdminsComponent,
    canActivate:[guardSessionGuard]
  },
  {
    path:'Preguntas',
    component:InfoPreguntasComponent,
    canActivate:[guardSessionGuard]
  },
  {
    path:'createPregunta',
    component:CreatePreguntaComponent,
    canActivate:[guardSessionGuard]
  },
  {
    path:'**',
    component:InfoUsersComponent,
    canActivate:[guardSessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
