import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { ComputadoresModule } from './computadores/computadores.module';
import {ComputadoresService} from './computadores/computadores.service'
import {LaboratoriosModule } from './laboratorios/laboratorios.module';
import { ServicosModule } from './servicos/servicos.module';
import {UsuariosModule} from './usuarios/usuarios.module';
import {LoginModule } from './login/login.module';
import { LayoutComponent } from './layout/layout.component'
import { UsuariosService } from './usuarios/usuarios.service';
import {TokenInterceptor } from './token.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PoPageDynamicSearchComponent, PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    ComputadoresModule,
    LaboratoriosModule,
    ServicosModule,
    UsuariosModule,
    LoginModule,
    FormsModule,
    PoPageDynamicSearchModule

  ],
  providers: [
    ComputadoresService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
