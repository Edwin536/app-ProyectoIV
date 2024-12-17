import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Destino } from '../models/Destino';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {

  constructor(private http: HttpClient) { }

  public Listar(): Observable<Destino[]> {
    return this.http.get<Destino[]>(`${environment.api}/destinos`);
  }

  public Consultar(idDestino: number): Observable<Destino> {
    return this.http.get<Destino>(`${environment.api}/destinos/${idDestino}`);
  }

  public Guardar(destino: Destino): Observable<number> {
    return this.http.post<number>(`${environment.api}/destinos`, destino);
  }

  public Actualizar(destino: Destino): Observable<number> {
    return this.http.put<number>(`${environment.api}/destinos`, destino);
  }
}