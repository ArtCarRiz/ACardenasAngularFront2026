import { municipio } from "./municipio-model";

export interface colonia{
   IdColonia: number,
   Nombre: string,
   CodigoPostal: string,
   municipio: municipio
}