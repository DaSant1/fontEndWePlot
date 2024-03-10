import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { guardSessionGuard } from '../Guards/guard-session.guard';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    canActivate:[guardSessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
