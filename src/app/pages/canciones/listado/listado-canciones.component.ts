import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerService } from '@services/drawer.service';
import { MusicaService } from '@services/musica.service';
import { plainToInstance } from 'class-transformer';
import { Song } from 'src/app/models/song';
import { MatCustomModule } from 'src/app/modules/mat-custom/mat-custom.module';

@Component({
  selector: 'app-listado-canciones',
  standalone: true,
  imports: [MatCustomModule],
  templateUrl: './listado-canciones.component.html',
  styleUrl: './listado-canciones.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoCancionesComponent {
  canciones: Song[] = [];

  constructor(
    private musicaService: MusicaService,
    private drawerService: DrawerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.musicaService.getSongs().subscribe({
      next: (res) =>  {
        console.log(res)
        this.canciones = plainToInstance(Song, res);
      }
    });
  }

  toggleSidenav(): void {
    this.drawerService.toggleDrawer();
  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle', id]);
  }
}
