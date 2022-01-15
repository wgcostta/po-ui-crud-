import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PoBreadcrumb,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoTableColumn,
} from '@po-ui/ng-components';
import { Usuarios } from '../Usuarios';
import { UsuariosService } from '../usuarios.service';
@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css'],
})
export class UsuariosListComponent implements OnInit {
  form: FormGroup;
  usuario: Usuarios;
  usuarios: Usuarios[];

  @ViewChild('modalSalvarUsuario', { static: true })
  modalSalvarUsuario: PoModalComponent;
  @ViewChild('modalEditarUsuario', { static: true })
  modalEditarUsuario: PoModalComponent;
  @ViewChild('modalExcluirUsuario', { static: true })
  modalExcluirUsuario: PoModalComponent;

  constructor(
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private poNotification: PoNotificationService
  ) {
    this.usuario = new Usuarios();
  }

  readonly breadcrump: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Usuarios', link: '/usuarios' },
    ],
  };

  ngOnInit(): void {
    this.listarTodos();
    this.iniciarForm();
  }

  iniciarForm(): void {
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
  }

  novoUsuario() {
    this.modalSalvarUsuario.open();
  }

  salvarUsuario() {
    this.usuario = this.form.value;
    this.usuariosService.salvarUsuario(this.usuario).subscribe((res) => {
      this.modalSalvarUsuario.close();
      this.listarTodos();
      this.poNotification.success('Usuário cadastrado com sucesso!');
    });
  }

  perguntaEditarUsuario(usuarios: Usuarios) {
    this.usuario = usuarios;
    this.form.get('id')?.setValue(this.usuario.id);
    this.form.get('nome')?.setValue(this.usuario.nome);
    this.form.get('email')?.setValue(this.usuario.email);
    this.form.get('senha')?.setValue(this.usuario.senha);
    this.modalEditarUsuario.open();
  }

  perguntaExcluirUsuario(usuarios: Usuarios) {
    this.usuario = usuarios;
    this.modalExcluirUsuario.open();
  }

  editarUsuario() {
    this.usuario = this.form.value;
    this.usuariosService.salvarUsuario(this.usuario).subscribe(
      (res) => {
        this.poNotification.success('Usuário editado com sucesso!');
        this.listarTodos();
      },
      (error) => {
        this.poNotification.error('Não foi possível editar o usuário!');
      }
    );
    this.modalEditarUsuario.close();
  }

  confirmaExcluirUsuario() {
    this.usuariosService.excluir(this.usuario.id).subscribe(
      (res) => {
        this.poNotification.success('Usuário excluído com sucesso!');
        this.listarTodos();
      },
      (error) => {
        this.poNotification.error('Não foi possível excluir o usuário!');
        console.log(error);
      }
    );
    this.modalExcluirUsuario.close();
  }

  listarTodos() {
    this.usuariosService.listarTodos().subscribe((res) => {
      this.items = res;
    });
  }

  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'Código',
      type: 'string',
    },
    {
      property: 'nome',
      label: 'Nome',
      type: 'string',
    },
    {
      property: 'email',
      label: 'E-mail',
      type: 'string',
    },
  ];

  items: Array<any> = [];
  testeUser: Array<any> = [];

  actionsTable = [
    {
      action: this.perguntaEditarUsuario.bind(this),
      label: 'Editar',
      icon: 'po-icon po-icon-edit',
    },
    {
      action: this.perguntaExcluirUsuario.bind(this),
      label: 'Excluir',
      icon: 'po-icon po-icon-delete',
    },
  ];

  cancelarCadastro: PoModalAction = {
    action: () => {
      this.modalSalvarUsuario.close();
    },
    label: 'Cancelar',
    danger: true,
  };

  salvarCadastro: PoModalAction = {
    action: () => {
      this.salvarUsuario();
    },
    label: 'Confirmar',
  };

  cancelarEditar: PoModalAction = {
    action: () => {
      this.modalEditarUsuario.close();
    },
    label: 'Cancelar',
    danger: true,
  };

  salvarEditar: PoModalAction = {
    action: () => {
      this.editarUsuario();
    },
    label: 'Confirmar',
  };

  excluirUsuario: PoModalAction = {
    action: () => {
      this.confirmaExcluirUsuario();
    },
    label: 'Confirmar',
  };

  cancelarExcluir: PoModalAction = {
    action: () => {
      this.modalExcluirUsuario.close();
    },
    label: 'Cancelar',
    danger: true,
  };
}
