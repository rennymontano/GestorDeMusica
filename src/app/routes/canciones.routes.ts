import { Routes } from '@angular/router';
import { ListadoCancionesComponent } from '../pages/canciones/listado/listado-canciones.component';

const cancionesRoute: Routes = [
    { path: '', component: ListadoCancionesComponent}
];

export default cancionesRoute;
