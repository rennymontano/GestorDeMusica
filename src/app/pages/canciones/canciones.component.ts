import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MusicaService } from '@services/musica.service';
import { MatCustomModule } from 'src/app/modules/mat-custom/mat-custom.module';

@Component({
  selector: 'app-canciones',
  standalone: true,
  imports: [ MatCustomModule ],
  templateUrl: './canciones.component.html',
  styleUrl: './canciones.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CancionesComponent {
  canciones: any[] = [];

  constructor(private musicaService: MusicaService) {}

  ngOnInit() {
    this.musicaService.getSongs().subscribe(data => {
      this.canciones = data.songs;
    });
  }
}
