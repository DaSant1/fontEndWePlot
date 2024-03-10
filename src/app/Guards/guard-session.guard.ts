import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class guardSessionGuard implements CanActivate{


  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      if(this.isTokenExpired()){
        alert("tu token ha expirado, inicia de nuevo la sesion")
        this.router.navigate(['/Login']);
        return false;
      }else{
        return true
      }
      //return true;
    } else {
      this.router.navigate(['/Login']);
      return false;
    }
  }

  private isTokenExpired():boolean{
    const tokenExpiration=localStorage.getItem('tokenExpiration');
    if(tokenExpiration){
      const expirationTime=parseInt(tokenExpiration,10);
      return expirationTime<new Date().getTime();
    }
    return true;
  }
}
