import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DrawerService } from '@services/drawer.service';
import { MusicaService } from '@services/musica.service';
import { MatCustomModule } from 'src/app/modules/mat-custom/mat-custom.module';

@Component({
  selector: 'app-listado-canciones',
  standalone: true,
  imports: [ MatCustomModule ],
  templateUrl: './listado-canciones.component.html',
  styleUrl: './listado-canciones.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoCancionesComponent {
  canciones: any[] = [];

  constructor(private musicaService: MusicaService,
    private drawerService: DrawerService) {}

  ngOnInit() {
    this.musicaService.getSongs().subscribe(data => {
      this.canciones = data.songs;
    });
  }

  toggleSidenav(): void {
    this.drawerService.toggleDrawer();
  }
}
