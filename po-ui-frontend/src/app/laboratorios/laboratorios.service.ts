import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Laboratorios } from './Laboratorios';
import { LaboratoriosListComponent } from './laboratorios-list/laboratorios-list.component';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriosService {

  constructor(private http: HttpClient) { }

  listarTodos():Observable<Laboratorios[]>{
    return this.http.get<Laboratorios[]>(environment.API_URL+'/laboratorios');
  }

  salvar(laboratorios: Laboratorios):Observable<Laboratorios>{
    return this.http.post<Laboratorios>(environment.API_URL+'/laboratorios',laboratorios)
  }

  excluir(idLaboratorio: number):Observable<any>{
    return this.http.delete<any>(environment.API_URL+`/laboratorios/${idLaboratorio}`);
  }
}
