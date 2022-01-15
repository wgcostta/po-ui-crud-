import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PoBreadcrumb, PoTableColumn, PoModalAction, PoModalComponent, PoNotificationService, PoTableColumnLabel, PoRadioGroupOption, PoSelectOption} from '@po-ui/ng-components';
import { Laboratorios } from 'src/app/laboratorios/Laboratorios';
import { LaboratoriosService } from 'src/app/laboratorios/laboratorios.service';
import { Computadores } from '../Computadores';
import {ComputadoresService} from '../computadores.service';

@Component({
  selector: 'app-computadores-list',
  templateUrl: './computadores-list.component.html',
  styleUrls: ['./computadores-list.component.css']
})
export class ComputadoresListComponent implements OnInit {
  form: FormGroup;
  computador: Computadores;
  laboratorio: Laboratorios;
  laboratorios: Laboratorios[] = [];

  
  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'Código',
      type: 'string'
    },
    {
      property: 'descricao',
      label: 'Descrição',
      type: 'string'
    },
    {
      property: 'descLaboratorio',
      label: 'Laboratório',
      type: 'string',
      
  },
  ];

  items: Array<any> = [];
  actionsTable = [
    {
      action: this.perguntaEditarComputador.bind(this),
      label: 'Editar',
      icon: 'po-icon po-icon-edit'
    },
    {
      action: this.perguntaExcluirComputador.bind(this),
      label: 'Excluir',
      icon: 'po-icon po-icon-delete'
    }
  ];

  cancelarCadastro: PoModalAction = {
    action: () => {
      this.modalSalvarComputador.close();
    },
    label: 'Cancelar',
    danger: true
  };

  salvarCadastro: PoModalAction = {
    action: () => {
      this.salvarComputador();
    },
    label: 'Confirmar'
  };

  cancelarCadastroComputador: PoModalAction = {
    action: () => {
      this.perguntaCancelarEdicao();
    },
    label: 'Cancelar',
    danger: true
  };

  editarCadastroComputador: PoModalAction = {
    action: () => {
      this.editarComputador();
    },
    label: 'Confirmar'
  };

  excluirCadastroComputador: PoModalAction = {
    action: () => {
      this.excluirComputador();
    },
    label: 'Confirmar'
  };

  cancelarExclusaoComputador: PoModalAction = {
    action: () => {
      this.cancelarExcluirComputador();
    },
    label: 'Cancelar',
    danger: true
  };



  @ViewChild(PoModalComponent, { static: true }) modalSalvarComputador: PoModalComponent;
  @ViewChild('modalEdicaoComputador', { static: true }) modalEdicaoComputador: PoModalComponent;
  @ViewChild('modalExcluirComputador', { static: true }) modalExcluirComputador: PoModalComponent;
  

  readonly breadcrump: PoBreadcrumb = {
    items:[
      {label: 'Home', link:'/'},
      {label: 'Computadores', link: '/computadores'},]
  }

  constructor(private service: ComputadoresService, private formBuilder: FormBuilder, private poNotification: PoNotificationService,
              private laboratorioService: LaboratoriosService) {
    this.computador = new Computadores();
   }

  ngOnInit(): void {
    this.iniciarForm();
    this.listarComputadores();
    this.listarLaboratorios();
  }

  iniciarForm(): void{
    this.form = this.formBuilder.group({
      id : [''],
      descricao : ['',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)]),],
      idLaboratorio: ['']
    })
  }

  listarComputadores(): void{
    
    this.service.listarTodos().subscribe(res =>{this.items = res});
  }

  listarLaboratorios(): void{
    this.laboratorioService.listarTodos().subscribe(res=>{this.laboratorios = res})
  }

  novoComputador(){
      this.modalSalvarComputador.open();
  }
  perguntaExcluirComputador(com: Computadores){
    this.computador = com;
    this.modalExcluirComputador.open();
  
  }
  excluirComputador(){
    this.service.deletar(this.computador.id).subscribe(
      res=>{
        this.poNotification.success("Computador excluído com sucesso!")
        this.listarComputadores();
      },
      error=>{
        this.poNotification.error("Não foi possível excluir o computador!")
      }
    )
    this.modalExcluirComputador.close();
    
  }
  cancelarExcluirComputador(){
    this.modalExcluirComputador.close();
  }
  perguntaCancelarEdicao(){
    this.modalEdicaoComputador.close();
    this.ngOnInit();
    
  }

  salvarComputador(){
    this.form.reset
    this.computador = this.form.value;
    this.service.salvar(this.computador).toPromise().then(
      res => {
        this.computador = res;
        this.poNotification.success('Computador salvo com sucesso!');
        this.listarComputadores();
      },
      error =>{
        this.poNotification.error('Não foi possível salvar o novo computador');
      }
    )
    this.modalSalvarComputador.close();
    
    
  }

  perguntaEditarComputador(com: Computadores){
    this.computador = com;
    this.form.get('id').setValue(this.computador.id);
    this.form.get('descricao').setValue(this.computador.descricao);
    this.form.get('idLaboratorio').setValue(this.computador.idLaboratorio);
    this.modalEdicaoComputador.open();
  }
    
  editarComputador(){
    this.computador = this.form.value;
    this.service.salvar(this.computador).toPromise().then(
      res => {
        this.computador = res;
        this.poNotification.success('Computador editado com sucesso!');
        this.listarComputadores();
      },
      error =>{
        this.poNotification.error('Não foi possível editar computador');
      }
    )
    this.modalEdicaoComputador.close();
  }

  limparForm(): void{
    this.form.get('computador.id').setValue(null);
    this.form.get('computador.descricao').setValue(null);
    this.form.get('computador.idLaboratorio').setValue('');
  }



}
