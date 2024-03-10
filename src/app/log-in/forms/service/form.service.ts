import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptinalLogInComponent } from '../optinal-log-in/optinal-log-in.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private matDialog:MatDialog) { }

  public openFormModeSesion(){
    this.matDialog.open(OptinalLogInComponent,{
      width:'320px',
      height:'300px'
    })
  }
}
