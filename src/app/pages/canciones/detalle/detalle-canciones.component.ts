import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerService } from '@services/drawer.service';
import { MusicaService } from '@services/musica.service';
import { Song, SongDetails } from 'src/app/models/song';
import { MatCustomModule } from 'src/app/modules/mat-custom/mat-custom.module';
import { plainToInstance } from "class-transformer"
import { Company } from 'src/app/models/company';
import { Artist } from 'src/app/models/artist';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-detalle-canciones',
  standalone: true,
  imports: [MatCustomModule],
  templateUrl: './detalle-canciones.component.html',
  styleUrl: './detalle-canciones.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetalleCancionesComponent {
  detalleCancion: SongDetails = new SongDetails();
  cancion: Song = new Song();
  companias: Company[] = [];
  artista: Artist = new Artist();
  isLoading: boolean =  true;

  constructor(
    private route: ActivatedRoute, 
    private musicaService: MusicaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSongDetails();
  }

  loadSongDetails() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin({
      cancion: this.musicaService.getSongById(id),
      artista: this.musicaService.getArtistBySong(id),
      companias: this.musicaService.getCompaniesBySong(id)
    }).subscribe({
      next: (res) => {
        this.cancion = plainToInstance(Song, res.cancion);
        this.artista = plainToInstance(Artist, res.artista);
        this.companias = plainToInstance(Company, res.companias);
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar los detalles de la canción", err);
        this.isLoading = false;
      }
    });
  }


  redirect() {
    this.router.navigate(['/']);
  }

  editarCancion() {
    this.router.navigate(['/editar', this.cancion.id]);
  }

  eliminarCancion() {
    if (confirm('¿Seguro que quieres eliminar esta canción?')) {
      alert(`Canción "${this.cancion.title}" eliminada`);
      this.router.navigate(['/canciones']);
    }
  }
}
