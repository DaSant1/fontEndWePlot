
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/Services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient,
              private authService:AuthService) { 

          this.getToken();
              }
  url=environment.urlApi;
  private token:any;
  public getAdmins(){
    
    return this.httpClient.get((`${this.url}admin/getAdmins`)).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }

  public getPreguntas(){
    return this.httpClient.get((`${this.url}pregunta/get`)).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }

  public getUsers(){
    return this.httpClient.get((`${this.url}getAllUsers`)).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }
  private getToken():Promise<any>{
    return new Promise(async(resolve,reject)=>{
      try{
        const token= await  this.authService.getToken();
        this.token=token;
        
        resolve(token);
       
      }catch(error){
        reject(error);
      }
    })
  }

  public ActivarPregunta(id:number){
    const data={
      id:id
    }
    return this.httpClient.post((`${this.url}pregunta/ActivarPreguntaById`),data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }

  public DesactivarPregunta(id:number){
    const data={
      id:id
    }
    return this.httpClient.post((`${this.url}pregunta/DesactivarPreguntaById`),data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }

  public createNewPregunta(idUser:number,pregunta:string){
    const data={
      idAdmin:idUser,
      pregunta:pregunta,
      idEstado:1
    }
    return this.httpClient.post((`${this.url}pregunta/create`),data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }

  public ExisteAdmin(id:any){
    const data={
      idUser:id
    }
    return this.httpClient.post((`${this.url}admin/getIdAdminByIdUser`),data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }

  public matricularAdmin(idUser:number){
      const data={
        idUser:idUser,
        Activo:1
      }
      return this.httpClient.post((`${this.url}admin/registrer`),data).pipe(
        catchError((error:HttpErrorResponse)=>{
          return throwError(error)
        })
      )
  }
}
