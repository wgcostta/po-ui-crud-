import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './Usuarios';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  tokenURL: string = environment.API_URL + environment.obterTokenUrl
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  obterToken() {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.obterToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired
    }
    return false
  }

  listarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.API_URL + '/users')
  }

  salvarUsuario(usuarios: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(environment.API_URL + '/users', usuarios)
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(environment.API_URL + `/users/${id}`)
  }

  getUsuarioByEmail(): Observable<Usuario> {
    return this.http.get<Usuario>(environment.API_URL + `/users?email=` + this.getUsuarioAutenticado());
  }

  deslogar() {
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado() {
    const token = this.obterToken();
    if (token) {
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
  }


  tentarLogar(email: string, password: string): Observable<any> {

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/json'
    }
    return this.http.post(this.tokenURL, {
      email: email,
      password: password
    }, { headers })

  }
}
