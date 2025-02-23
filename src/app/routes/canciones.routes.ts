import { Routes } from '@angular/router';
import { ListadoCancionesComponent } from '../pages/canciones/listado/listado-canciones.component';
import { DetalleCancionesComponent } from '../pages/canciones/detalle/detalle-canciones.component';
import { NuevaCancionComponent } from '../pages/canciones/nueva/nueva-cancion.component';

const cancionesRoute: Routes = [
    { path: '', component: ListadoCancionesComponent},
    { path: 'detalle/:id', component: DetalleCancionesComponent},
    { path: 'nueva', component: NuevaCancionComponent},
];

export default cancionesRoute;
