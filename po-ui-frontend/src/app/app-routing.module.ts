import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ComputadoresListComponent } from './computadores/computadores-list/computadores-list.component';
import { LaboratoriosListComponent } from './laboratorios/laboratorios-list/laboratorios-list.component'
import { LayoutComponent } from './layout/layout.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { ServicosListComponent } from './servicos/servicos-list/servicos-list.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  

  {path:'login',component:LoginFormComponent},
  {path:'', component:LayoutComponent,canActivate: [AuthGuard],children:[
    {path:'computadores',component:ComputadoresListComponent},
    {path:'laboratorios',component:LaboratoriosListComponent},
    {path:'servicos',component:ServicosListComponent},
    {path:'usuarios',component:UsuariosListComponent},
    {path:'home',component:HomeComponent},
    {path: '', redirectTo:'/home', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
