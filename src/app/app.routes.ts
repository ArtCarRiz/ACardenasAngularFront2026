import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/UsuarioComponent/usuario-component/usuario-component';
import { FormComponent } from './components/FormComponent/form-component/form-component';

export const routes: Routes = [
    {path:"usuario", component:UsuarioComponent},
    {path:"form", component:FormComponent}
];
