import { Destino } from "./Destino";

export interface Alojamiento {

    id_alojamiento: number;
    nombre: string;
    cantidad_personas: number;
    fecha_ingreso: Date;
    fecha_salida: Date;
    precio: number;
    ubicacion: string;
    estado: boolean;
    destino: Destino;
}