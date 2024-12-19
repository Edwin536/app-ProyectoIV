import { Cliente } from "./Cliente";

export interface Reserva {

    idReserva: number;
    fecha_ida: Date;
    fecha_regreso: Date;
    precio: number;
    estado: boolean;
    cliente: Cliente;
}