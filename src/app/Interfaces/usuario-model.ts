import { direccion } from "./direccion-model";
import { Rol } from "./rol-model";

export interface UsuarioModel {
    IdUsuario: number,
    Nombre: string,
    ApellidoPaterno: string,
    ApellidoMaterno: String,
    FechaNacimiento: Date,
    Telefono: string,
    Email: string,
    Username: string,
    Password: string,
    Sexo: string,
    Celular: string,
    Curp: string,
    Imagen: string,
    Estatus: number,
    Direcciones: direccion[],
    Rol: Rol
}
