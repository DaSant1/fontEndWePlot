import { Component,OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-info-preguntas',
  templateUrl: './info-preguntas.component.html',
  styleUrl: './info-preguntas.component.css'
})
export class InfoPreguntasComponent implements OnInit{
  
  dtOptions:DataTables.Settings={
  }
  preguntas:any;
  
  dtTrigger:Subject<any>= new Subject<any>
  constructor(private adminService:AdminService){}

  ngOnInit(): void {
      this.getPreguntas();
      this.InitDataTable();
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
  

  private getPreguntas(){
    this.adminService.getPreguntas().subscribe((result:any)=>{
      this.dtOptions.destroy;
      this.dtTrigger.next(void 0);
      this.InitDataTable();
      this.preguntas=result;
      this.InitDataTable();
    },(error)=>{
      switch(error.status){
        case 500:
          alert("error con Acceder a los Datos");
          break;
      }
    })
  }

  public coordinarProcesoActualizacionRol(id:number,index:number){
    if(this.preguntas[index].Activo===1){
      this.adminService.DesactivarPregunta(id).subscribe((result:any)=>{
        alert("Se ha desactivado la pregunta Exitosamente");
        this.getPreguntas();
      })
    }else if(this.preguntas[index].Activo===0){
      this.adminService.ActivarPregunta(id).subscribe((result:any)=>{
        alert("Se ha activado la pregunta Exitosamente");
        this.getPreguntas();
      })
    }
  }
}
