import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-canciones',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './canciones.component.html',
  styleUrl: './canciones.component.scss'
})
export class CancionesComponent {

}
