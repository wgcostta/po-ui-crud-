import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { PoMenuItem, PoModalComponent, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
import { Usuarios } from '../usuarios/Usuarios';
import { UsuariosService } from '../usuarios/usuarios.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  idUsuario: any = '';
  usuarioAutenticado: string = '';
  usuario: Usuarios;
  avatar = 'http://lorempixel.com/300/300/cats/';
  constructor(private router: Router, private usuarioService: UsuariosService) { }


  @ViewChild( 'modalProfile', { static: true }) modalProfile: PoModalComponent;

  ngOnInit(){

  }
  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.navegarHome.bind(this), icon: 'po-icon-home'  },
    { label: 'Serviços', action: this.navegarServicos.bind(this), icon: 'po-icon-document-filled'  },
    { label: 'Computadores', action: this.navegarComputadores.bind(this), icon: 'po-icon-device-desktop'  },
    { label: 'Laboratórios', action: this.navegarLaboratorios.bind(this), icon: 'po-icon-layers' },
    { label: 'Usuários', action: this.navegarUsuarios.bind(this), icon: 'po-icon-users' }
  ];
  notificationActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-news',
      label: 'É apenas um teste :/',
      type: 'danger',
    }
  ]
  profile: PoToolbarProfile = {
    avatar: 'http://lorempixel.com/144/144/cats',
    subtitle: 'Seja bem vindo ao sistema!',
    title: this.usuarioService.getUsuarioAutenticado()
  }
  profileActions: Array<PoToolbarAction> = [
    { icon: 'po-icon-user', label: 'Perfil', type: 'primary', separator: true, action: (item: any) => this.modalPerfil(item) },
    { icon: 'po-icon-exit', label: 'Exit', type: 'danger', separator: true, action: (item: any) => this.deslogar(item) }
  ];

  private deslogar($event: any){
    this.usuarioService.deslogar();
    this.router.navigateByUrl('/login')
  }
  private modalPerfil($event: any){
    this.modalProfile.open()
  }
  private navegarHome() {
    this.router.navigateByUrl('/home')
    }
  private navegarServicos(){
    this.router.navigateByUrl('/servicos')
  }
  private navegarComputadores(){
      this.router.navigateByUrl('/computadores')
  }
  private navegarLaboratorios(){
    this.router.navigateByUrl('/laboratorios')
  }
  private navegarUsuarios(){
    this.router.navigateByUrl('/usuarios')
  }



}
