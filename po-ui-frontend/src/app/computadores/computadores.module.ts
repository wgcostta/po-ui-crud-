import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputadoresListComponent } from './computadores-list/computadores-list.component';
import { PoTableModule,PoModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ComputadoresListComponent],
  imports: [
    CommonModule,
    PoTableModule,
    PoPageDynamicSearchModule,
    HttpClientModule,
    PoModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ComputadoresListComponent
  ]
})
export class ComputadoresModule { }
