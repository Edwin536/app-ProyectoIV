import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Reserva } from "../models/Reserva";

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  public Listar (): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${environment.api}/reservas`);
  }

  public Consultar(idReserva: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${environment.api}/reservas/${idReserva}`);
  }

  public Guardar(reserva: Reserva): Observable<number> {
    return this.http.post<number>(`${environment.api}/reservas`, reserva);
  };

  public Actualizar(reserva: Reserva): Observable<number> {
    return this.http.put<number>(`${environment.api}/reservas`, reserva);
  }
}