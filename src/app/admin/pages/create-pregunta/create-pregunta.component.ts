import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../core/Services/auth.service';
import { AdminModule } from '../../admin.module';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-create-pregunta',
  templateUrl: './create-pregunta.component.html',
  styleUrl: './create-pregunta.component.css'
})
export class CreatePreguntaComponent implements OnInit{
  private idUser:number=0;
  private idAdmin:number=0;
  protected pregunta!:string;
  constructor(private authService:AuthService,
              private adminService:AdminService){}
  ngOnInit(): void {
      this.getIdUser();
  }

  private getIdUser(){
    return new Promise(async(resolve,reject)=>{
      try{
        this.idUser= await  this.authService.getIdUser();
        resolve(this.idUser);
      }catch(error){
        reject(error);
      }
    })
  }

  public coordinarCreacionPregunta(){
    if(this.idUser===0 && this.pregunta===''){
      alert("No se puede ejecutar la transacción");
    }else{
      this.getIdAdmin();

    }
  }

  private createNewPregunta(){
    this.adminService.createNewPregunta(this.idAdmin,this.pregunta).subscribe((result:any)=>{
      alert("Se ha creado exitosamente la pregunta");
    })
  }

 

  private getIdAdmin(){
    this.adminService.ExisteAdmin(this.idUser).subscribe((result:any)=>{
      this.idAdmin=result[0]['idUser'];
      console.log("id Admin",this.idAdmin);
      console.log("result",result)
      if(this.idAdmin>0){
         this.createNewPregunta();
      }else{
        alert("Esta acción solo es disponible para administradores del sistema")
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
