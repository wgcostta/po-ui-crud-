import { Component, OnInit, ViewChild } from '@angular/core';

import { PoPageChangePasswordComponent } from '@po-ui/ng-templates';

import { PoBreadcrumb, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { UsuariosService } from '../usuarios/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios as Usuario } from '../usuarios/Usuarios';
@Component({
  selector: 'app-created-user',
  templateUrl: './created-user.component.html',
  styleUrls: ['./created-user.component.css']
})
export class CreatedUserComponent implements OnInit {
  
  @ViewChild(PoPageChangePasswordComponent) changePassword: PoPageChangePasswordComponent;
  form: FormGroup;
  url: string;
  usuario: Usuario;
  changePasswordScreen = false;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/documentation/po-page-change-password' }, { label: 'Profile' }]
  };

  public readonly cityOptions: Array<PoSelectOption> = [{ label: 'São Paulo', value: 'sp' }];

  public readonly countryOptions: Array<PoSelectOption> = [{ label: 'Brazil', value: 'br' }];
  constructor(private usuariosService: UsuariosService, 
    private formBuilder: FormBuilder,
    private poNotification: PoNotificationService) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.form = this.formBuilder.group({
      id: [''],
      email: [''],
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
      ],
      senha: [''],
    });
    this.url = '/home';
  }

  onSubmit() {
    this.changePassword.openConfirmation();
  }

  showChangePasswordScreen() {
    this.changePasswordScreen = true;
  }

  showProfileScreen() {
    this.changePasswordScreen = false;
  }

  salvarUsuario() {
    this.usuario = this.form.value;
    this.usuariosService.salvarUsuario(this.usuario).subscribe((res) => {
      this.poNotification.success('Usuário cadastrado com sucesso!');
    });
  }

}


