import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuarioModel } from '../../../Interfaces/usuario-model';
import { UsuarioService } from '../../../Services/usuario-service';
import { Rol } from '../../../Interfaces/rol-model';
import { pais } from '../../../Interfaces/pais-model';
import { estado } from '../../../Interfaces/estado-model';
import { municipio } from '../../../Interfaces/municipio-model';
import { colonia } from '../../../Interfaces/colonia-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-component.html',
  styleUrl: './form-component.css',
})
export class FormComponent {

  public usuario: UsuarioModel | undefined;
  public roles: Rol[] = [];
  public paises: pais[] = [];
  public estados: estado[] = [];
  public municipios: municipio[] = [];
  public colonias: colonia[] = [];
  public identificador: number | undefined;
  public imagenSeleccionada: File | null = null;

  private formularioReactivo = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);


  public form: FormGroup = this.formularioReactivo.group({
    Nombre: [''],
    ApellidoPaterno: [''],
    ApellidoMaterno: [''],
    FechaNacimiento: [''],
    Curp: [''],
    Sexo: [''],
    Celular: [''],
    Telefono: [''],
    Email: [''],
    Username: [''],
    Password: [''],
    Imagen: [''],
    Rol: [null],


    Direcciones: this.formularioReactivo.array([
      this.formularioReactivo.group({
        IdDireccion: [0],
        CodigoPostal: [''],
        Calle: [''],
        NumeroExterior: [''],
        NumeroInterior: [''],
        colonia: [null]
      })

    ])
    /*     Pais: [''],
        Estado: [''],
        Municipio: [''],
        Colonia: [''], */
  })

  ngOnInit(): void {
    this.getRoles();
    this.getPaises();

  }

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

  getPaises() {
    this.usuarioService.getPaises().subscribe(
      data => {
        console.log(data)
        this.paises = data.objects;
      }, error => {
        console.log("Error")
      }
    )
  }

  imagenCargada(event: any) {
    if (event.target.files.length > 0) {
      this.imagenSeleccionada = event.target.files[0];
    }
  }

  enviarDatos() {
    this.usuario = this.form.value as UsuarioModel;
    this.usuario.Estatus = 1;
    const usuarioParaEnviar = this.form.value as UsuarioModel;
    console.log("Colonia en la dirección 0:", usuarioParaEnviar.Direcciones[0].colonia);
    this.usuarioService.addUsuario(this.usuario, this.imagenSeleccionada).subscribe({
      next: (data) => {
        if (data.correct) {
          console.log("CORRECTO adD")
        } else {
          console.log("INCORRECTO ADD")
        }
      }
    })

  }


  cambioPais(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.identificador = +selectElement.value;
    console.log('ID seleccionado:', selectElement.value);
    this.getEstados();
    //this.getEstados(this.identificador);
  };

    getEstados() {
    this.usuarioService.getEstados(this.identificador).subscribe(
      data => {
        console.log(data)
        this.estados = data.objects;
      }
    )
  }

  cambioEstado(event: Event) {
    const optionEstado = event.target as HTMLSelectElement;
    this.identificador = +optionEstado.value;
    console.log("Id de estados: ", this.identificador);
    this.getMunicipios();

  }

  cambioMunicipio(event: Event) {
    const optionMunicipio = event.target as HTMLSelectElement;
    this.identificador = +optionMunicipio.value;
    console.log("Id de municipio: ", this.identificador);
    this.getColonia();
  }



  getMunicipios() {
    this.usuarioService.getMunicipios(this.identificador).subscribe(
      data => {
        console.log(data);
        this.municipios = data.objects;
      }
    )
  }

  getColonia() {
    this.usuarioService.getColonia(this.identificador).subscribe(
      data => {
        console.log(data);
        this.colonias = data.objects;
      }
    )

  }
}
