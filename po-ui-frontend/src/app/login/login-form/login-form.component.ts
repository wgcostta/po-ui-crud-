import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoDialogService } from '@po-ui/ng-components';
import { PoPageLogin } from '@po-ui/ng-templates';
import { Usuarios } from 'src/app/usuarios/Usuarios';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  form: FormGroup;
  usuario: Usuarios;
  exceededAttempts: number;

  
  constructor(private usuarioService: UsuariosService, private formBuilder: FormBuilder, private poDialog: PoDialogService, private router: Router) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm(): void{
    this.form = this.formBuilder.group({
      email: [''],
      senha : ['',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)]),],
    })
  }


  loginSubmit(formData: PoPageLogin){
    this.usuarioService.tentarLogar(formData.login,formData.password).subscribe(
      res=>{
        const access_token = JSON.stringify(res);
        localStorage.setItem('access_token',access_token)
        this.router.navigateByUrl('/home')
      },
      error=>{
        this.poDialog.alert({
          title: 'Atenção',
          message: 'Dados Inválidos'
        })
      }
    )
  }

}
