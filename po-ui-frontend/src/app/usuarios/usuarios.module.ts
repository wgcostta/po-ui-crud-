import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [UsuariosListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PoModule,
    PoPageDynamicSearchModule,
    HttpClientModule
  ],
  exports: [
    UsuariosListComponent
  ]
})
export class UsuariosModule { }
