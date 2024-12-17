import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  public Listar (): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.api}/clientes`);
  }

  public Consultar(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.api}/clientes/${idCliente}`);
  }

  public Guardar(cliente: Cliente): Observable<number> {
    return this.http.post<number>(`${environment.api}/clientes`, cliente);
  };

  public Actualizar(cliente: Cliente): Observable<number> {
    return this.http.put<number>(`${environment.api}/clientes`, cliente);
  }
}
