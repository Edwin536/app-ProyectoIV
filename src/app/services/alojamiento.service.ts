import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Alojamiento } from '../models/Alojamiento';

@Injectable({
  providedIn: 'root'
})
export class AlojamientoService {

  constructor(private http: HttpClient) { }

  public Listar (): Observable<Alojamiento[]> {
    return this.http.get<Alojamiento[]>(`${environment.api}/alojamientos`);
  }

  public Consultar(idAlojamiento: number): Observable<Alojamiento> {
    return this.http.get<Alojamiento>(`${environment.api}/alojamientos/${idAlojamiento}`);
  }

  public Guardar(alojamiento: Alojamiento): Observable<number> {
    return this.http.post<number>(`${environment.api}alojamientos`, alojamiento);
  };

  public Actualizar(alojamiento: Alojamiento): Observable<number> {
    return this.http.put<number>(`${environment.api}/alojamientos`, alojamiento);
  }
}