import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../core/Services/auth.service';
import { Subject } from 'rxjs';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  constructor(private authService:AuthService,
            private userService:UserService,
            private router:Router){}
  fullName!:string;
  emailUser!:string;
  countryUser!:string;
  phoneUser!:string;
  dtOptions:DataTables.Settings={};
  dtTrigger:Subject<any>=new Subject<any>;
  respuestas:any;
  idUser:number=0;
  ngOnInit(): void {
      this.getUserEmail();
      this.getUserName();
      this.getIdUser();
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

  public getRespuestasByIdUser(){
    this.userService.getPreguntasByIdUser(this.idUser).subscribe((result:any)=>{
      this.respuestas=result
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
  private getIdUser():Promise<any>{
    
    return new Promise(async (resolve, reject) => {
      try {
        console.log
        const data = await this.authService.getIdUser();
        this.idUser=data;
        this.getRespuestasByIdUser();
        resolve(data);
      
      } catch (error) {
        reject(error);
      }
    });
  }
  private InitDataTable():void{
    this.dtOptions={
    pagingType:'full_numbers',
    pageLength:10,
    searching:true,
    ordering:true,
    responsive:true,
    retrieve:true,
    language:{
     "infoEmpty":"No se han Seleccionado Insumos",
     "search": "Buscar",
     "loadingRecords": "Cargando Informacion...",
     "info": "Mostrado _PAGE_ de _PAGES_ paginas",
     "lengthMenu": "Mostrando _MENU_ registros por pagina",
     "zeroRecords": "Lo siento, el criterio buscado no corresponde a los datos",
     "thousands": ",",
     "paginate":{
      "first":"Primera Pagina",
      "last": "Ultima Pagina",
      "next": "Siguiente Pagina",
      "previous": "Anterior Pagina"
     },
     "aria":{
      "sortAscending":": Organizar de manera ascendente",
      "sortDescending": ": Organizar de manera Descendente"
     }
    }
  };
  }

  public Logout(){
    this.router.navigate(['/LogIn/'])
  }
}
