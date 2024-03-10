import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../../../core/Services/auth.service';
import { AdminService } from '../../Services/admin.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-info-users',
  templateUrl: './info-users.component.html',
  styleUrl: './info-users.component.css'
})
export class InfoUsersComponent implements OnInit {

  dtOptions:DataTables.Settings={};
  dtTrigger:Subject<any>=new Subject<any>;
  Users:any;
  private idAdmin:number=0;
  private idUser:number=0;
  constructor(private adminService:AdminService){}

  ngOnInit(): void {
      this.getUsers();
      this.InitDataTable();
  }

  filaSeleccionada:any
 private getUsers()  {
       this.adminService.getUsers().subscribe((result:any)=>{
        this.dtOptions.destroy;
        this.dtTrigger.next(void 0);
        this.InitDataTable();
        this.Users=result;
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

  public  coordinarMatriculaAdmin(idUser:number,index:number){
    this.idUser=idUser;
    console.log("s")
    if(this.idUser>0){
      this.getIdAdmin();
    }
}
private matricularAdmin(idUser:number){
  this.adminService.matricularAdmin(this.idUser).subscribe((result:any)=>{
    alert("Se ha matriculado el usuario como Admin Exitosamente");
  },(error)=>{
    alert("Error en el acceso a los datos");
  }) 
}

private getIdAdmin(){
  this.adminService.ExisteAdmin(this.idUser).subscribe((result:any)=>{
    if(result){
      this.idAdmin=result[0]['idUser'];
    }else{
      this.idAdmin=0;
    }
    
    console.log("id Admin",this.idAdmin);
    console.log("result",result)
    if(this.idAdmin>0){
       alert("Este usuario ya tiene rol Administrador registrado");
    }else{
      this.matricularAdmin(this.idAdmin);
    }
  },(error)=>{
    switch (error.status) {
      case 500:
        alert("Ha ocurrido un error en el acceso a los datos");
        break;
    }
  });
}
}
