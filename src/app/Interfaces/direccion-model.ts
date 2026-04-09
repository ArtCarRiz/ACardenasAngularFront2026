import { colonia } from "./colonia-model";

export interface direccion{
    IdDireccion: number,
    Calle: string,
    NumeroExterior: string,
    NumeroInterior: string,
    colonia: colonia
}