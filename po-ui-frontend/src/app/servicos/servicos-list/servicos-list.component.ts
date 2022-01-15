import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  PoBreadcrumb,
  PoModalAction,
  PoModalComponent,
  PoNotification,
  PoNotificationService,
  PoPageSlideComponent,
  PoTableColumn,
} from '@po-ui/ng-components';
import { colors } from '@po-ui/ng-components/lib/interceptors/po-http-interceptor/po-http-interceptor-detail/po-http-interceptor-detail.component';
import { Computadores } from 'src/app/computadores/Computadores';
import { ComputadoresService } from 'src/app/computadores/computadores.service';
import { Laboratorios } from 'src/app/laboratorios/Laboratorios';
import { LaboratoriosService } from 'src/app/laboratorios/laboratorios.service';
import { Usuarios } from 'src/app/usuarios/Usuarios';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { ServicoConcluido } from '../ServicoConcluido';
import { Servicos } from '../Servicos';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-servicos-list',
  templateUrl: './servicos-list.component.html',
  styleUrls: ['./servicos-list.component.css'],
})
export class ServicosListComponent implements OnInit {
  form: FormGroup;
  servico: Servicos;
  servicoConcluido: ServicoConcluido;
  laboratorios: Laboratorios[] = [];
  computadores: Computadores[] = [];
  usuario: Usuarios;
  itemSelect: any;
  idLaboratorio: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: ServicosService,
    private computadorService: ComputadoresService,
    private laboratorioService: LaboratoriosService,
    private poNotification: PoNotificationService,
    private usuarioService: UsuariosService
  ) {
    this.servico = new Servicos();
    this.servicoConcluido = new ServicoConcluido();
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.listarTodos();
    this.listarLaboratorios();
    this.listarComputadores();
    this.filtrarUsuarioPorEmail();
  }

  readonly breadcrump: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Serviços', link: '/servicos' },
    ],
  };
  @ViewChild('modalDetalhesServico', { static: true })
  modalDetalhesServico: PoModalComponent;
  @ViewChild('modalFiltro', { static: true }) modalFiltro: PoModalComponent;
  @ViewChild('modalSalvarServico', { static: true })
  modalSalvarServico: PoModalComponent;
  @ViewChild('modalAlterarStatus', { static: true })
  modalAlterarStatus: PoModalComponent;
  @ViewChild('modalObservacaoStatus', { static: true })
  modalObservacaoStatus: PoModalComponent;

  cancelarAtualizarStatus: PoModalAction = {
    action: () => {
      this.modalAlterarStatus.close();
    },
    label: 'Cancelar',
    danger: true,
  };

  confirmaAtualizarStatus: PoModalAction = {
    action: () => {
      this.atualizarStatus();
    },
    label: 'Confirmar',
  };
  cancelarObservacaoStatus: PoModalAction = {
    action: () => {
      this.modalObservacaoStatus.close();
    },
    label: 'Cancelar',
    danger: true,
  };

  abreObservacaoStatus: PoModalAction = {
    action: () => {
      this.observacaoStatus();
    },
    label: 'Confirmar',
  };

  perguntaFiltroStatus() {
    this.modalFiltro.open();
  }
  perguntaAlterarStatus(serv: Servicos, servConcluido: any) {
    this.servico = serv;
    this.servicoConcluido = servConcluido;
    this.form.get('id')?.setValue(this.servico.id);
    this.form.get('idUsuario')?.setValue(this.servico.idUsuario);
    this.form.get('idLaboratorio')?.setValue(this.servico.idLaboratorio);
    this.form.get('idComputador')?.setValue(this.servico.idComputador);
    this.form.get('dataAbertura')?.setValue(this.servico.dataAbertura);
    this.form.get('descricao')?.setValue(this.servico.descricao);
    this.form.get('status')?.setValue(this.servico.status);
    this.modalAlterarStatus.open();
  }
  observacaoStatus() {
    this.modalAlterarStatus.close();
    this.modalObservacaoStatus.open();
  }

  atualizarStatus() {
    let status = this.form.get('status')?.value;

    if (status == 'P') {
      this.form.get('status')?.setValue('C');
    } else {
      this.modalObservacaoStatus.close();
      return this.poNotification.error(
        'Não é possível alterar um serviço já concluído!'
      );
    }

    this.servico = this.form.value;
    this.service.salvarServico(this.servico).subscribe(
      (res) => {
        this.poNotification.success('Status alterado com sucesso!');
        this.listarTodos();
      },
      (error) => {
        this.poNotification.error('Não foi possível alterar o status!');
      }
    );

    this.modalObservacaoStatus.close();
  }

  filtrarUsuarioPorEmail() {
    this.usuarioService.getUsuarioByEmail().subscribe((res) => {
      this.usuario = res;
      this.form.get('idUsuario')?.setValue(this.usuario.id);
    });
  }
  iniciarForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      descricao: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
      ],
      idLaboratorio: [''],
      dataAbertura: [''],
      idComputador: [''],
      idUsuario: [''],
      status: ['P'],
      observacao: [''],
    });
  }

  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'Código',
      type: 'string',
    },
    {
      property: 'descComputador',
      label: 'Computador',
      type: 'string',
    },
    {
      property: 'descLaboratorio',
      label: 'Laboratório',
      type: 'string',
    },
    {
      property: 'dataAbertura',
      label: 'Data de Abertura',
      type: 'date',
    },
    {
      property: 'nomeUsuario',
      label: 'Usuário',
      type: 'string',
    },

    {
      property: 'status',
      type: 'subtitle',
      width: '80px',
      subtitles: [
        { value: 'P', color: 'color-08', label: 'Pendente', content: 'P' },
        { value: 'C', color: 'color-11', label: 'Concluído', content: 'C' },
      ],
    },
  ];

  items: Array<any> = [];
  actionsTable = [
    {
      action: this.perguntaAlterarStatus.bind(this),
      label: 'Alterar Status',
      icon: 'po-icon po-icon-edit',
    },
    {
      action: this.perguntaDetalhesServico.bind(this),
      label: 'Detalhes',
      icon: 'po-icon po-icon-list',
    },
  ];

  listarTodos() {
    this.service.listarTodos().subscribe((res) => {
      this.items = res;
    });
  }
  listarServicosPorStatusP() {
    this.service.listarComFiltroStatusP('P').subscribe((res) => {
      this.items = res;
    });
    this.modalFiltro.close();
  }
  listarServicosPorStatusC() {
    this.service.listarComFiltroStatusC('C').subscribe((res) => {
      this.items = res;
    });
    this.modalFiltro.close();
  }
  listarComputadores() {
    this.computadorService.listarTodos().subscribe((res) => {
      this.computadores = res;
    });
  }
  listarCompPorLab() {
    let idLaboratorio = this.form.get('idLaboratorio')?.value;
    this.computadorService
      .listarComputadoresFiltroPorIdLab(idLaboratorio)
      .subscribe((res) => {
        this.computadores = res;
      });
  }

  listarLaboratorios() {
    this.laboratorioService.listarTodos().subscribe((res) => {
      this.laboratorios = res;
    });
  }
  perguntaDetalhesServico(serv: Servicos) {
    this.servico = serv;
    this.modalDetalhesServico.open();
  }
  salvarServico() {
    this.servico = this.form.value;
    this.service.salvarServico(this.servico).subscribe((res) => {
      this.poNotification.success('Serviço aberto com sucesso!');
      this.listarTodos();
      this.iniciarForm();
    });
    this.service.listarComFiltroStatusP('');
  }
}
