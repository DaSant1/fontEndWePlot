import { DatePipe } from '@angular/common';
import { Component,OnInit,OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../Services/admin.service';
import { AuthService } from '../../../core/Services/auth.service';

@Component({
  selector: 'app-info-admins',
  templateUrl: './info-admins.component.html',
  styleUrl: './info-admins.component.css'
})
export class InfoAdminsComponent implements OnInit,OnDestroy{

  constructor(private adminService:AdminService,
              private authService:AuthService){}
  ngOnInit(): void {
      this.getAdmins();
      this.InitDataTable();
  }
  ngOnDestroy(): void {
    
  }

  dtOptions:DataTables.Settings={};
  dtTrigger:Subject<any>= new Subject<any>;
  fechaPipe=new DatePipe('en-US');
  admins:any;
  private idUser:number=0;
  private idAdmin:number=0;
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

  private getAdmins(){
    this.adminService.getAdmins().subscribe((result:any)=>{
      this.dtOptions.destroy;
      this.dtTrigger.next(void 0);
      this.InitDataTable();
      this.admins=result  
    },(error)=>{
      switch(error.status){
        case 500:
          alert("error con Acceder a los Datos");
          break;
        case 401:
          alert("Usuario no Autorizado");
          break;
      }
    })
  }
 
 

  
}
