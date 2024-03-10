import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  url=environment.urlApi;

  public getPreguntasByIdUser(idUser:number){
    const data={
      idUser:idUser
    }
    return this.httpClient.post((`${this.url}pregunta/getRespuestasByIdUser`),data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }
}
