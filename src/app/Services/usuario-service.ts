import { Injectable } from '@angular/core';
import { UsuarioModel } from '../Interfaces/usuario-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { result } from '../Interfaces/result-model';
import { Rol } from '../Interfaces/rol-model';
import { pais } from '../Interfaces/pais-model';
import { estado } from '../Interfaces/estado-model';
import { municipio } from '../Interfaces/municipio-model';
import { colonia } from '../Interfaces/colonia-model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getAll(): Observable<result<UsuarioModel>> {
    return this.http.get<result<UsuarioModel>>(this.url+"/usuario");
  }

  roles(): Observable<result<Rol>>{
    return this.http.get<result<Rol>>(this.url+"/usuario/Rol")
  }

  getPaises(): Observable<result<pais>>{
    return this.http.get<result<pais>>(this.url+"/pais")
  }

  getEstados(idPais : any): Observable<result<estado>>{
    return this.http.get<result<estado>>(this.url+"/estado?identificador=" + idPais)
  }

  getMunicipios(idEstado: any): Observable<result<municipio>>{
    return this.http.get<result<municipio>>(this.url+"/municipio?identificador=" + idEstado)
  }

  getColonia(idMunicipio: any): Observable<result<colonia>>{
    return this.http.get<result<colonia>>(this.url+"/colonia?identificador=" + idMunicipio)
  }

  addUsuario(usuario : UsuarioModel, imagen: File | null): Observable<result<UsuarioModel>>{
    const formData = new FormData();
    const datosBlob = new Blob([JSON.stringify(usuario)], { type: 'application/json' });
    formData.append('datos', datosBlob);

    if (imagen) {
    formData.append('imagen', imagen);
  }


    return this.http.post<result<UsuarioModel>>(this.url+"/usuario", formData);
  }

}
