import { Component } from '@angular/core';
import { MatCustomModule } from '@modules/mat-custom/mat-custom.module';

@Component({
  selector: 'app-skeleton-detalle',
  standalone: true,
  imports: [MatCustomModule],
  templateUrl: './skeleton-detalle.component.html',
  styleUrl: './skeleton-detalle.component.scss'
})
export class SkeletonDetalleComponent {

}
