import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerService } from '@services/drawer.service';
import { MusicaService } from '@services/musica.service';
import { Song, SongDetails } from 'src/app/models/song';
import { MatCustomModule } from '@modules/mat-custom/mat-custom.module';
import { plainToInstance } from "class-transformer"
import { Company } from 'src/app/models/company';
import { Artist } from 'src/app/models/artist';
import { forkJoin } from 'rxjs';
import { SkeletonDetalleComponent } from '@skeletons/skeleton-detalle/skeleton-detalle.component';
import { DetalleInfoComponent } from './detalle-info/detalle-info.component';
import { DetalleEditComponent } from './detalle-edit/detalle-edit.component';
import Swal from 'sweetalert2'
import { Store } from '@ngxs/store';
import { MusicaActions } from 'src/app/store/musicas/musica.actions';

@Component({
  selector: 'app-detalle-canciones',
  standalone: true,
  imports: [MatCustomModule, SkeletonDetalleComponent, DetalleInfoComponent, DetalleEditComponent],
  templateUrl: './detalle-canciones.component.html',
  styleUrl: './detalle-canciones.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetalleCancionesComponent {
  detalleCancion: SongDetails = new SongDetails();
  cancion: Song = new Song();
  companias: Company[] = [];
  artista: Artist = new Artist();
  isLoading: boolean = true;
  isEdit: boolean = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private musicaService: MusicaService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.detalleMusica(this.id);
  }

  detalleMusica(id: number) {
    this.isLoading = true;
    this.musicaService.getSongDetails(id).subscribe({
      next: (res) => {
        this.cancion = plainToInstance(Song, res?.song);
        this.artista = plainToInstance(Artist, res?.artist);
        this.companias = plainToInstance(Company, res?.companies);
        this.isLoading = false;
      },
      error: (e) => {
        console.error(e);
        this.isLoading = false;
      }
    })
  }


  deleteSong() {
    this.isLoading = true;
    this.musicaService.deleteSong(this.cancion.id).subscribe({
      next: (res) => {
        this.modificarArtist();
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  modificarArtist() {
    this.artista.songs = this.artista.songs.filter((x) => x != this.cancion.id)
    this.musicaService.updateArtist(this.artista.id, this.artista).subscribe({
      next: (res) => {

        this.modificarCompany();
      },
      error: (e) => {
        console.error(e)
      }
    })

  }

  modificarCompany() {
    console.log(this.companias)
    const requests = this.companias.map((x: any) => {
      x.songs = x.songs.filter((f: any) => f != this.cancion.id);
      return this.musicaService.updateCompanies(x.id, x);
    });

    forkJoin(requests).subscribe({
      next: () => {
        this.store.dispatch(new MusicaActions.Refresh);
        this.isLoading = false;
        this.redirect();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }


  redirect() {
    this.router.navigate(['/']);
  }

  editarCancion() {
    this.isEdit = !this.isEdit
  }

  cancelar(event: any) {
    this.editarCancion();
  }

  guardar(event: Company[]) {
    this.editarCancion();
    this.detalleMusica(this.id);
    this.store.dispatch(new MusicaActions.Refresh);
    this.companias = event.filter(company => company.songs.includes(this.cancion.id));
  }

  eliminarCancion() {
    Swal.fire({
      title: "Eliminar Canción",
      text: "¿Estás seguro de que deseas eliminar esta canción?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: '#F44336',
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#003d3d',
      confirmButtonText: 'Confirmar',
      customClass: {
        title: 'swal-title-custom',
        icon: 'swal-icon-custom'
      }
    }).then((res) => {
      if (res.isConfirmed) {
        this.deleteSong();

      }
    })
  }
}
