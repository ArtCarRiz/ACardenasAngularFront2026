import { UsuarioModel } from "./usuario-model";

export interface result <T>{
    correct: boolean,
    errorMessage: string,
    ex: any,
    object: T,
    objects: T[]
}

