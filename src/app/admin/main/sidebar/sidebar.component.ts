import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../core/Services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  constructor(private authService:AuthService){}
  fullName!:string;
  emailUser!:string;
  countryUser!:string;
  phoneUser!:string;
  ngOnInit(): void {
      this.getUserEmail();
      this.getUserName();
  }
  public getUserName():Promise<any>{
    return new Promise(async(resolve,reject)=>{
      try{
        this.fullName= await  this.authService.getUserName();
        resolve(this.fullName);
      }catch(error){
        reject(error);
      }
    })
  }

  public getUserEmail():Promise<any>{
    return new Promise(async(resolve,reject)=>{
      try{
        this.emailUser=await this.authService.getEmailUser();
        resolve(this.emailUser);
      }catch(error){
        reject(error);
      }
    })
  }
}
