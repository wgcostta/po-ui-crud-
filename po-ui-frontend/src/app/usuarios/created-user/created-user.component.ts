import { Component, OnInit, ViewChild } from '@angular/core';

import { PoPageChangePasswordComponent } from '@po-ui/ng-templates';

import { PoBreadcrumb, PoNotificationService, PoPageAction, PoSelectOption } from '@po-ui/ng-components';
import { UsuariosService } from '../usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario as Usuario } from '../Usuarios';
import { Router } from '@angular/router';
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
  newActions: Array<PoPageAction>;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/documentation/po-page-change-password' }, { label: 'Profile' }]
  };

  public readonly cityOptions: Array<PoSelectOption> = [{ label: 'São Paulo', value: 'sp' }];

  public readonly countryOptions: Array<PoSelectOption> = [{ label: 'Brazil', value: 'br' }];
  constructor(private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private poNotification: PoNotificationService,
    private router: Router) { }

  ngOnInit() {
    this.initialize();
    this.newActions = [
      {
        label: "Salvar",
        action: this.salvarUsuario.bind(this),
        icon: 'po-icon-plus',
        disabled: () => this.isFormValid,
      },
      {
        label: "Cancelar",
        action: this.cancelar.bind(this),
      },
    ];

    // this.form.statusChanges.subscribe(() => {
    //   if (this.form.valid) {

    //     this.habilitaBotaoDeAcao();
    //   }
    // });

  }

  get isFormValid(): boolean {
    return !(this.form.valid && this.form.get("password")?.value
      == this.form.get("senhaConfirmacao")?.value);
  }

  initialize() {
    this.form = this.formBuilder.group({
      id: [''],
      email: ['', Validators.required,],
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
      ],
      password: ['', Validators.required,],
      senhaConfirmacao: ['', Validators.required,],
    });
    this.url = '/home';

  }

  onSubmit() {
    this.changePassword.openConfirmation();
  }

  showChangePasswordScreen() {
    this.changePasswordScreen = true;
  }

  cancelar() {
    this.router.navigateByUrl("/home")
  }

  salvarUsuario() {
    this.usuario = this.form.value;
    this.usuariosService.salvarUsuario(this.usuario).subscribe((res) => {
      this.poNotification.success('Usuário cadastrado com sucesso!');
    });
  }

}


