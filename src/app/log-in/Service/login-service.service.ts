import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { loginModel } from '../Models/Login-model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpClient:HttpClient) { }
  url=environment.urlApi;

  public authenticate(data:loginModel){
    return this.httpClient.post((`${this.url}user/autenticar`),data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }

  public ExisteAdmin(id:any){
    const data={
      idUser:id
    }
    return this.httpClient.post((`${this.url}admin/getAdminByIdUser`),data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }
}
