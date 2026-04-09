import { Component, model } from '@angular/core';
import { UsuarioModel } from '../../../Interfaces/usuario-model';
import { UsuarioService } from '../../../Services/usuario-service';
import { result } from '../../../Interfaces/result-model';

@Component({
  selector: 'app-usuario-component',
  imports: [],
  templateUrl: './usuario-component.html',
  styleUrl: './usuario-component.css',
})
export class UsuarioComponent {

  public usuarios : UsuarioModel[] = [];

  //public usuarios : result<UsuarioModel>[] = [];

  constructor(private usuarioService : UsuarioService){}

  ngOnInit():void{
    this.GetAll();
  }

  GetAll(){
    this.usuarioService.getAll().subscribe(
      data=>{
        console.log(data);
        this.usuarios = data.objects;
      },
      error=>{

      }
    )
  }

}
