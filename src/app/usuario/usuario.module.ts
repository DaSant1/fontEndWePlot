import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { MainComponent } from './pages/main/main.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    DataTablesModule
  ]
})
export class UsuarioModule { }
