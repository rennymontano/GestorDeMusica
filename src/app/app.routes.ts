import { Routes } from '@angular/router';
import { CancionesComponent } from './pages/canciones/canciones.component';

export const routes: Routes = [
    { path: '', component: CancionesComponent, loadChildren: () => import('./routes/canciones.routes')}
];
