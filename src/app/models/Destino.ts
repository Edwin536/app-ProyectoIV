import { Pais } from "./Pais";

export interface Destino {

    idDestino: number;
    nombre: string;
    descripcion: string;
    estado: boolean;
    pais: Pais;
}