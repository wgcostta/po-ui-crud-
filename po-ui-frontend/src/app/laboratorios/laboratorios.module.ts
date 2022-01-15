import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoriosRoutingModule } from './laboratorios-routing.module';
import { LaboratoriosListComponent } from './laboratorios-list/laboratorios-list.component';
import { PoModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LaboratoriosListComponent],
  imports: [
    CommonModule,
    LaboratoriosRoutingModule,
    PoModule,
    PoPageDynamicSearchModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    LaboratoriosListComponent
  ]
})
export class LaboratoriosModule { }
