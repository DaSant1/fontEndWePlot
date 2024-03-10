import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
@Component({
  selector: 'app-optinal-log-in',
  templateUrl: './optinal-log-in.component.html',
  styleUrl: './optinal-log-in.component.css'
})
export class OptinalLogInComponent {

    constructor(private optionalLogin:MatDialogRef<OptinalLogInComponent>,
                private router:Router){}
    options: string[] = ['Modo Usuario', 'Modo Administrador'];
    selectedOption:any;
    protected closeForm(){
      this.optionalLogin.close();
    }

    public coordinarOpcion():void{
      if(this.selectedOption==='Modo Usuario'){
        this.gotoModeUser();
      }else if(this.selectedOption==='Modo Administrador'){
        this.gotoModeAdmin();
      }else{
        
      }
    }
    private gotoModeAdmin(){
      this.router.navigate(['Admin/']);
      this.closeForm();
    }

    private gotoModeUser(){
      this.router.navigate(['User/']);
      this.closeForm();
    }
  }
