import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../models/Pais';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  public Listar (): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${environment.api}/paises`);
  }

  public Consultar(idPais: number): Observable<Pais> {
    return this.http.get<Pais>(`${environment.api}/paises/${idPais}`);
  }

  public Guardar(pais: Pais): Observable<number> {
    return this.http.post<number>(`${environment.api}/paises`, pais);
  };

  public Actualizar(pais: Pais): Observable<number> {
    return this.http.put<number>(`${environment.api}/paises`, pais);
  }
}