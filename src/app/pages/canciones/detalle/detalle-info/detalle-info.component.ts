import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCustomModule } from '@modules/mat-custom/mat-custom.module';
import { Artist } from 'src/app/models/artist';
import { Company } from 'src/app/models/company';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-detalle-info',
  standalone: true,
  imports: [MatCustomModule],
  templateUrl: './detalle-info.component.html',
  styleUrl: './detalle-info.component.scss',
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetalleInfoComponent {
   @Input() cancion: Song = new Song();
   @Input() companias: Company[] = [];
   @Input() artista: Artist = new Artist();

}
