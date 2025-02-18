import { Component, Input } from '@angular/core';
import { MatCustomModule } from 'src/app/modules/mat-custom/mat-custom.module';

@Component({
  selector: 'app-skeleton-listado',
  standalone: true,
  imports: [ MatCustomModule ],
  templateUrl: './skeleton-listado.component.html',
  styleUrl: './skeleton-listado.component.scss'
})
export class SkeletonListadoComponent {
  esqueletos: number[] = [1, 2, 3, 4, 5]
}
