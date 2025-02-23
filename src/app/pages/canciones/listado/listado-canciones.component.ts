import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { MatCustomModule } from '@modules/mat-custom/mat-custom.module';
import { Store } from '@ngxs/store';
import { DrawerService } from '@services/drawer.service';
import { MusicaService } from '@services/musica.service';
import { SkeletonListadoComponent } from '@skeletons/skeleton-listado/skeleton-listado.component';
import { plainToInstance } from 'class-transformer';
import { Song } from 'src/app/models/song';
import { MusicaState } from 'src/app/store/musicas/musica.state';

@Component({
  selector: 'app-listado-canciones',
  standalone: true,
  imports: [MatCustomModule, SkeletonListadoComponent],
  templateUrl: './listado-canciones.component.html',
  styleUrl: './listado-canciones.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoCancionesComponent {
  canciones: Song[] = [];
  isLoading: boolean = true;

  constructor(
    private musicaService: MusicaService,
    private drawerService: DrawerService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit() {
    
    this.store.select(MusicaState.canciones).subscribe({
      next: (res) =>  {
        const isLoadCanciones = this.store.selectSnapshot(MusicaState.isLoadCanciones)
        if(isLoadCanciones) {
          this.canciones = plainToInstance(Song, res);
          this.isLoading = false;
        }
      }
    });
  }

  toggleSidenav(): void {
    this.drawerService.toggleDrawer();
  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle', id]);
  }

  nuevaCancion() {
    this.router.navigate(['/nueva']);
  }
}
