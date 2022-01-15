import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicosRoutingModule } from './servicos-routing.module';
import { ServicosListComponent } from './servicos-list/servicos-list.component';
import { PoTableModule,PoModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ServicosListComponent],
  imports: [
    CommonModule,
    ServicosRoutingModule,
    HttpClientModule,
    PoTableModule,
    PoModule,
    ReactiveFormsModule,
    FormsModule,
    PoPageDynamicSearchModule  
  ],
  exports: [
    ServicosListComponent
  ]
})
export class ServicosModule { }
