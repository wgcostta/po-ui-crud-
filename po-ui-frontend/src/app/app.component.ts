import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { PoMenuItem, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }
  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this), icon: 'po-icon-home'  },
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
    avatar: 'https://via.placeholder.com/48x48?text=AVATAR',
    subtitle: 'Seja bem vindo ao sistema!',
    title: 'Ruan',

  }

  private onClick() {
    alert('Clicked in menu item')
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


