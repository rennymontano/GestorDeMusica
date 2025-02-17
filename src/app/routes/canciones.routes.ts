import { Routes } from '@angular/router';
import { ListadoCancionesComponent } from '../pages/canciones/listado/listado-canciones.component';
import { DetalleCancionesComponent } from '../pages/canciones/detalle/detalle-canciones.component';

const cancionesRoute: Routes = [
    { path: '', component: ListadoCancionesComponent},
    { path: 'detalle/:id', component: DetalleCancionesComponent},
];

export default cancionesRoute;
