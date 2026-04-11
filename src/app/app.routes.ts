import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/UsuarioComponent/usuario-component/usuario-component';
import { FormComponent } from './components/FormComponent/form-component/form-component';
import { DetailsComponent } from './components/DetailsComponent/details-component/details-component';

export const routes: Routes = [
    {path:"usuario", component:UsuarioComponent},
    {path:"form", component:FormComponent},
    {path:"details/:idUsuario", component:DetailsComponent}
];
