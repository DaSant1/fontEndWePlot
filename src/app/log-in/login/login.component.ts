import { Component } from '@angular/core';
import { LoginServiceService } from '../Service/login-service.service';
import { Router } from '@angular/router';
import { loginModel } from '../Models/Login-model';
import { error } from 'jquery';
import { AuthService } from '../../core/Services/auth.service';
import { FormService } from '../forms/service/form.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    password!:string;
    email!:string;
    LogInData!:loginModel;
    ResponseCode:any;
    constructor(private router:Router,
          private loginService:LoginServiceService,
          private authService:AuthService,
          private formService:FormService){}
    
    protected validateData(){
      if(this.password!='' && this.email!=''){
        this.saveDataOnModel();
        this.LogIn();
      }else{

      }
    }

    private saveDataOnModel(){
      this.LogInData={
        email:this.email,
        password:this.password
      }
    }
    /*private LogIn(){
      let Response;
      //console.log(this.LogInData);
      this.loginService.authenticate(this.LogInData).subscribe((result:any)=>{
        Response=result;
        localStorage.setItem('token',Response.token);
        const expirationTime=new Date();
        expirationTime.setHours(expirationTime.getHours()+1);
        localStorage.setItem('tokenExpiration',expirationTime.getTime().toString());
        this.getToken();
      },error=>{
        switch(error.status){
          case 500:
            alert("ha ocurrido un error en el acceso a los datos");
            break;
          case 400:
            alert("Credenciales Incorrectas");
            break;
        }
      })
    }*/
    private LogIn(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.loginService.authenticate(this.LogInData).subscribe((result: any) => {
          //localStorage.setItem('token', result.token);
          this.authService.login(result.token);
          const expirationTime = new Date();
          expirationTime.setHours(expirationTime.getHours() + 1);
          localStorage.setItem('tokenExpiration', expirationTime.getTime().toString());
          
          const token =this.getToken();
         
          resolve(result);
        }, error => {
          switch (error.status) {
            case 500:
              alert("Ha ocurrido un error en el acceso a los datos");
              break;
            case 400:
              alert("Credenciales incorrectas");
              break;
          }
          reject(error);
        });
      });
    }
    
  

  private getToken(){
 
    const token=this.authService.getToken();
    this.getIdUser(token);
  }
  private getIdUser(token:any):Promise<any>{
    
    return new Promise(async (resolve, reject) => {
      try {
        
        const data = await this.authService.getIdUser();
        resolve(data);
        this.getIdAdmin(data);
        
      } catch (error) {
        reject(error);
      }
    });
  }

  private getIdAdmin(idUser:any){
    this.loginService.ExisteAdmin(idUser).subscribe((result:any)=>{
      if(result.Existe===true){
        this.authService.setEsAdmin();
        this.formService.openFormModeSesion();
      }else{
        this.router.navigate(['/User/']);
      }
    },(error)=>{
      switch (error.status) {
        case 500:
          alert("Ha ocurrido un error en el acceso a los datos");
          break;
      }
    });
  }
}
