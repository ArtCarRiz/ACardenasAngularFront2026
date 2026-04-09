import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuarioModel } from '../../../Interfaces/usuario-model';
import { UsuarioService } from '../../../Services/usuario-service';
import { Rol } from '../../../Interfaces/rol-model';
import { pais } from '../../../Interfaces/pais-model';
import { estado } from '../../../Interfaces/estado-model';
import { municipio } from '../../../Interfaces/municipio-model';
import { colonia } from '../../../Interfaces/colonia-model';

@Component({
  selector: 'app-form-component',
  imports: [ReactiveFormsModule],
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
    Rol: [''],

    Pais: [''],
    Estado: [''],
    Municipio: [''],
    Colonia: [''],
    CodigoPostal: [''],
    Calle: [''],
    NumeroExterior: [''],
    NumeroInterior: [''],
    Imagen: [''],

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



  enviarDatos() {
    this.usuario = this.form.value as UsuarioModel;
    this.usuarioService.addUsuario(this.usuario).subscribe;

  }


  cambioPais(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.identificador = +selectElement.value;
    console.log('ID seleccionado:', selectElement.value);
    this.getEstados();
    //this.getEstados(this.identificador);
  };

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

  getEstados() {
    this.usuarioService.getEstados(this.identificador).subscribe(
      data => {
        console.log(data)
        this.estados = data.objects;
      }
    )
  }

  getMunicipios() {
    this.usuarioService.getMunicipios(this.identificador).subscribe(
      data =>{
        console.log(data);
        this.municipios = data.objects;
      }
    )
  }

  getColonia() {
    this.usuarioService.getColonia(this.identificador).subscribe(
      data =>{
        console.log(data);
        this.colonias = data.objects;
      }
    )

  }
}
