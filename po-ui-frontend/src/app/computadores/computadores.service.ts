import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Computadores} from './Computadores'

@Injectable({
  providedIn: 'root'
})
export class ComputadoresService {

  constructor(private http: HttpClient) {}

  listarTodos():Observable<Computadores[]>{
      return this.http.get<Computadores[]>(environment.API_URL+'/computadores');
  }
  salvar(computadores: Computadores):Observable<Computadores>{
    return this.http.post<Computadores>(environment.API_URL+'/computadores',computadores);
  }
  deletar(idComputador: number): Observable<any>{
    return this.http.delete<any>(environment.API_URL+`/computadores/${idComputador}`);
  }
  listarComputadoresFiltroPorIdLab(idLaboratorio: number):Observable<Computadores[]>{
    return this.http.get<Computadores[]>(environment.API_URL+`/computadores?idLaboratorio=${idLaboratorio}`)
  }

}
