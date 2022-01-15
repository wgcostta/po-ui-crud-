import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { PoModule } from '@po-ui/ng-components';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    PoModule,
    RouterModule.forRoot([]),
    PoPageLoginModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    LoginFormComponent
  ]
})
export class LoginModule { }
