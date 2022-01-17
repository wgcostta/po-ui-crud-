import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { PoPageChangePasswordModule, PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { CreatedUserComponent } from './created-user/created-user.component';



@NgModule({
  declarations: [UsuariosListComponent, CreatedUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PoModule,
    PoPageDynamicSearchModule,
    HttpClientModule, 
    PoPageChangePasswordModule
  ],
  exports: [
    UsuariosListComponent
  ]
})
export class UsuariosModule { }
