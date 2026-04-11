import { Component, Inject, inject, Input, input, signal } from '@angular/core';
import { UsuarioService } from '../../../Services/usuario-service';
import { UsuarioModel } from '../../../Interfaces/usuario-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-component',
  imports: [],
  templateUrl: './details-component.html',
  styleUrl: './details-component.css',
})
export class DetailsComponent {

  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  public usuario: UsuarioModel | undefined;

ngOnInit(): void {
  this.route.params.subscribe(params => {
    const idUsuario = params['idUsuario'];
    this.getById(idUsuario);
  });
}
  //@Input() idUsuario: number | undefined;


  getById(idUsuario: number){
    this.usuarioService.getById(idUsuario).subscribe(
      data =>{
        console.log(data);
        this.usuario = data.object

      }, error =>{
        console.log("ERROR getById");
      }
    )
  }


}
