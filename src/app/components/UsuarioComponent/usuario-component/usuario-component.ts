import { Component, model, output, signal } from '@angular/core';
import { UsuarioModel } from '../../../Interfaces/usuario-model';
import { UsuarioService } from '../../../Services/usuario-service';
import { result } from '../../../Interfaces/result-model';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-usuario-component',
  imports: [RouterLink],
  templateUrl: './usuario-component.html',
  styleUrl: './usuario-component.css',
})
export class UsuarioComponent {
  imagenDefault: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkSaWVN5ig-gqQzzBRyJDY6vBC_oDflVq-og&s';

  public idUsuario: number | undefined;
  public usuarios: UsuarioModel[] = [];

  //public usuarios : result<UsuarioModel>[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll() {
    this.usuarioService.getAll().subscribe(
      data => {
        console.log(data);
        this.idUsuario = data.objects[0].IdUsuario; //falta probar si funciona
        this.usuarios = data.objects;
      },
      error => {

      }
    )
  }

  updateEstatus(event: Event, idUsuario: number, estatus: number) {
    const swEstatus = event.target as HTMLInputElement;
    estatus = swEstatus.checked ? 1 : 0;
    //idUsuario = this.idUsuario || 0;
    this.usuarioService.udpateEstatus(idUsuario, estatus).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log("ERROR udpateEstatus");
      }
    )
  }

  deleteUsuario(event: Event, idUsuario: number) {
    this.usuarioService.deleteUsuario(idUsuario).subscribe(
      data => {
        console.log(data);
        this.GetAll();
      }, error => {
        console.log("ERROR deleteUsuario");
      }
    )
  }

}
