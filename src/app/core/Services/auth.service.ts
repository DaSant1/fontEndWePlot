import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  private token:string | null=null;
  private esAdmin:boolean=false;
  url=environment.urlApi;
  constructor(private httpClient:HttpClient) { }

  public login(token:string){
    this.token=token;
    localStorage.setItem('token',token);
  }

  public setEsAdmin(){
    this.esAdmin=true;
  }

  public getEsAdmin(){
    return this.esAdmin;
  }
  public logOut():void{
    this.token=null;
    localStorage.removeItem('token');
  }

  public getToken():string | null{
    return localStorage.getItem('token');
  }

  public isAuthenticated():boolean{
    return this.token!=null;
  }

  private getUsuarioByToken(token:string){
    const data={
      token:token
    }
    return this.httpClient.post((`${this.url}user/getAuthenticatedUser`),data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
    
  }
  public getUserName():Promise<string>{
    return new Promise((resolve,reject)=>{
    const  token=this.getToken();
    if(token){
      this.getUsuarioByToken(token).subscribe(
        (result:any)=>{
        //console.log("result",result.user['name']);
        const name=  result.user['name'];
        resolve(name) 
      },(error)=>{
        reject(error);
      })
    }else{
      this.logOut();
      reject('no hay token Disponible');
    }
    })
   }

   public getIdUser():Promise<number>{
    return new Promise((resolve,reject)=>{
      const token=this.getToken();
      if(token){
        this.getUsuarioByToken(token).subscribe((result:any)=>{
        const id= result.user['id']; 
          resolve(id);
        },(error)=>{
          reject(error);
        })
      }else{
        reject('No hay token Disponible');
      }
     
    })
   
   }

   public getEmailUser():Promise<string>{
    return new Promise((resolve,reject)=>{
      const token=this.getToken();
      if(token){
        this.getUsuarioByToken(token).subscribe((result:any)=>{  
        const email= result.user['email'];
        resolve(email); 
        },(error)=>{
          reject(error);
        })
      }else{
        reject('No hay token Disponible')
      }
      
    })
    
   }


   public getUserByToken(token:string){
    const data={
      token:token
    }
    return this.httpClient.post((`${this.url}user/GetAuthenticatedUser`),data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
    
  }
}
