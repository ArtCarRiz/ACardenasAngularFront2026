import { Component, Inject, inject, Input, input, signal } from '@angular/core';
import { UsuarioService } from '../../../Services/usuario-service';
import { UsuarioModel } from '../../../Interfaces/usuario-model';
import { ActivatedRoute } from '@angular/router';
import { Rol } from '../../../Interfaces/rol-model';
import { Form, FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-details-component',
  imports: [ReactiveFormsModule],
  templateUrl: './details-component.html',
  styleUrl: './details-component.css',
})
export class DetailsComponent {

  public usuario: UsuarioModel | undefined;
  public roles: Rol[] = [];
  public idUsuario: number = 0;

  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  private formularioReactivo = inject(FormBuilder);

  public form: FormGroup = this.formularioReactivo.group({
    Nombre: [''],
    ApellidoPaterno: [''],
    ApellidoMaterno: [''],
    FechaNacimiento: [''],
    Curp: [''],
    Sexo: [''],
    Celular: [''],
    Telefono: [''],
    Username: [''],
    Rol: [''],
    Email: ['']
  })



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idUsuario = params['idUsuario'];
      this.getById(idUsuario);
    });

    this.getRoles();
  }
  //@Input() idUsuario: number | undefined;
  getRoles() {
    this.usuarioService.roles().subscribe(
      data => {
        console.log(data)
        this.roles = data.objects
      },
      error => {
        console.log("ERROR")
      }
    )
  }

  getById(idUsuario: number) {
    this.usuarioService.getById(idUsuario).subscribe(
      data => {
        console.log(data);
        this.idUsuario = data.object.IdUsuario;
        this.usuario = data.object

      }, error => {
        console.log("ERROR getById");
      }
    )
  }

  deleteDireccion(idDireccion: number) {
    this.usuarioService.deleteDireccion(idDireccion).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log("ERROR deleteDireccion");
      }
    )
  }

  updateUsuario() {
    this.usuario = this.form.value as UsuarioModel;
    if (this.usuario) {
      this.usuarioService.updateUsuario(this.usuario, this.idUsuario).subscribe(
        data => {
          console.log(data);
        }, error => {
          console.log("ERROR updateUsuario");
        }
      )
    }
  }


}
