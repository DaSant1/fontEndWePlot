import { Component,OnInit } from '@angular/core';
import { SignupServiceService } from '../Service/signup-service.service';
import { registrerModel } from '../models/registre-model';
import { registrerAnswerModel } from '../models/registrerAnswer-model';
import { LoginServiceService } from '../../log-in/Service/login-service.service';
import { AuthService } from '../../core/Services/auth.service';
import { loginModel } from '../../log-in/Models/Login-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  idUser:number=0;
  preguntas:any;
  RespuestaArray:string[]=[];
  primerNombre!:string;
  segundoNombre!:string
  message:string=''
  email!:string
  password1!:string
  password2!:string
  signUpModel!:registrerModel;
  tempRegistrerAnswerModel!:registrerAnswerModel;
  LogInData!:loginModel
  private idUsuario:number=0;
  private QPreguntas:number=0;
  constructor(private signupService:SignupServiceService,
              private loginService:LoginServiceService,
              private authService:AuthService,
              private router:Router){}
  ngOnInit(): void {
      this.getPreguntasDisponibles();
  }

  private getPreguntasDisponibles(){
    this.signupService.getPreguntasDisponibles().subscribe((result:any)=>{
      this.QPreguntas=result.length;
      this.preguntas=result;
    },(error)=>{
      alert("Error en el acceso a los datos");
    })
  }

  public verificarCampos(){
    if(this.validarpreguntasRespondidas()===false){
      alert("Es necesario responder todas las preguntas")
    }else{
      this.verificarform();
    }
  }
  private validarpreguntasRespondidas():boolean{
    let tempRespuesta=true;
    for(let j=0;j<=this.QPreguntas-1;j++){
      if(this.RespuestaArray[j]===undefined){
        tempRespuesta=false;
      }
    }
    return tempRespuesta;
  }

  public verificarPasswords(password:any){
    if(password===this.password2){
      this.message="Las contraseñas no coinciden"
    }else{
      this.message=''
    }
  }
  public verificarform(){
    if(this.primerNombre!=='' && this.segundoNombre!='' && this.email!='' && this.password2!=''){
      this.saveDataOnSignUpModel();
      this.saveSignUp();
      this.setData();
    }else{
      alert("Se requiere llenar todo el formulario");
    }
  }

  private saveDataOnSignUpModel(){
    this.signUpModel={
      first_name:this.primerNombre,
      last_name:this.segundoNombre,
      name:this.primerNombre+this.segundoNombre,
      email:this.email,
      password:this.password2
    }
  }

  private async saveSignUp(){
    try{
      const response= await this.signupService.userRegistrer(this.signUpModel).toPromise()
      alert("Usuario creado Exitosamente");
      this.LogIn();
    }catch(error){
      alert("Error al subir los datos, estamos en mantenimiento");
    }
  }

  private setData(){
    this.LogInData={
      email:this.email,
      password:this.password2
    }
  
  }

  private LogIn(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loginService.authenticate(this.LogInData).subscribe((result: any) => {
        this.authService.login(result.token);
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);
        localStorage.setItem('tokenExpiration', expirationTime.getTime().toString());
        
        const token = this.getToken();
        
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
        console.log
        const data = await this.authService.getIdUser();
        this.idUser=data;
        this.saveRespuestasUser();
        resolve(data);
        
      } catch (error) {
        reject(error);
      }
    });
  }

  private async saveRespuestasUser(){
    let Exito=0,Fallo=0;
    for(let j=0;j<=this.QPreguntas-1;j++){
      try{
         this.tempRegistrerAnswerModel={
          idUser:this.idUser,
          idPregunta:this.preguntas[j]['id'],
          respuesta:this.RespuestaArray[j]
        };
        console.log("dato;",this.tempRegistrerAnswerModel);
        const response= await this.signupService.savePreguntaByIdPreguntaAndUser(this.tempRegistrerAnswerModel).toPromise();
        Exito++;
      }catch(error){
        Fallo++;
      }
      
    
  }

  if(Fallo===0){
    this.router.navigate(['/User/'])
  }else{
    alert("No se pudo subir todas las respuestas");
  }
}
}
