import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './admin/main/sidebar/sidebar.component';
import { guardSessionGuard } from './Guards/guard-session.guard';

const routes: Routes = [
  {
    path:'LogIn',
    loadChildren:()=>import("../app/log-in/log-in.module").then(m=>m.LogInModule)
  },
  {
    path:'SignUp',
    loadChildren:()=>import("../app/sign-up/sign-up.module").then(m=>m.SignUpModule)
  },
  {
    path:'Admin',
    component:SidebarComponent,
    loadChildren:()=>import("../app/admin/admin.module").then(m=>m.AdminModule),
    canActivate:[guardSessionGuard]
  },
  {
    path:'User',
    loadChildren:()=>import("../app/usuario/usuario.module").then(m=>m.UsuarioModule),
    canActivate:[guardSessionGuard]
  },
  {
    path:'**',
    redirectTo:'/LogIn'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
