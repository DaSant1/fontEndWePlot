import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { registrerModel } from '../models/registre-model';
@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {
  url=environment.urlApi;
  constructor(private httpClient:HttpClient) { }

  public userRegistrer(data:registrerModel){
    return this.httpClient.post((`${this.url}user/registrer`),data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }

  public getPreguntasDisponibles(){
    return this.httpClient.get((`${this.url}pregunta/getPreguntasDisponibles`)).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }

  public savePreguntaByIdPreguntaAndUser(data:registrerModel){
    return this.httpClient.post((`${this.url}pregunta/createNewRespuestaByUser`),data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }
}
