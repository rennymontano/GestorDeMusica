import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCustomModule } from '@modules/mat-custom/mat-custom.module';
import { Store } from '@ngxs/store';
import { MusicaService } from '@services/musica.service';
import { SkeletonNuevaComponent } from '@skeletons/skeleton-nueva/skeleton-nueva.component';
import { plainToInstance } from 'class-transformer';
import { Artist } from 'src/app/models/artist';
import { Company } from 'src/app/models/company';
import { Song } from 'src/app/models/song';
import { MusicaActions } from 'src/app/store/musicas/musica.actions';

@Component({
  selector: 'app-nueva-cancion',
  standalone: true,
  imports: [MatCustomModule, ReactiveFormsModule, SkeletonNuevaComponent],
  templateUrl: './nueva-cancion.component.html',
  styleUrls: ['./nueva-cancion.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NuevaCancionComponent {
  cancionForm: FormGroup;
  anioActual: number = new Date().getFullYear();
  isLoading: boolean = true;

  generosDisponibles: string[] = ["Rock", "Pop", "Alternative", "Blues", "Heavy", "Chill", "Psychedelic rock", "Romance"];
  generosSeleccionados: string[] = [];
  idSongLast: number;

  companies: Company[] = [];
  companiasDisponibles: Company[] = [];
  companiasSeleccionadas: any[] = [];

  artistas: Artist[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private musicaService: MusicaService,
    private store: Store
  ) {
    this.cancionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      artistas: [null, [Validators.required]],
      generos: [[], [Validators.required]],
      companias: [[], [Validators.required]],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(this.anioActual)]],
      duracion: ['', [Validators.required, Validators.min(1)]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs() {
    this.isLoading = true;
    this.musicaService.getSongs().subscribe({
      next: (res) => {
        if (res)
          this.idSongLast = (res.length > 0 ? Math.max(...res.map(s => s.id)) : 0) + 1;

        this.getArtists();
      }, error: (e) => {
        console.error(e);
      }
    })
  }

  getArtists() {
    this.musicaService.getArtists().subscribe({
      next: (res) => {
        this.artistas = plainToInstance(Artist, res);
        this.getCompanies();
      }, error: (e) => {
        console.error(e);
      }
    })
  }

  getCompanies() {
    this.musicaService.getCompanies().subscribe({
      next: (res) => {
        this.companiasDisponibles = plainToInstance(Company, res);
        this.companies = plainToInstance(Company, res);
        this.isLoading = false;
      }, error: (e) => {
        console.error(e);
      }
    })
  }

  agregarGenero(genero: string) {
    if (genero && !this.generosSeleccionados.includes(genero)) {
      this.generosSeleccionados.push(genero);
      this.generosDisponibles = this.generosDisponibles.filter(g => g !== genero);
      this.cancionForm.controls['generos'].setValue([...this.generosSeleccionados]);
    }
  }

  removerGenero(genero: string) {
    this.generosSeleccionados = this.generosSeleccionados.filter(g => g !== genero);
    this.generosDisponibles = [...this.generosDisponibles, genero].sort();
    this.cancionForm.controls['generos'].setValue([...this.generosSeleccionados]);
  }

  agregarCompania(compania: any) {
    if (compania && !this.companiasSeleccionadas.includes(compania)) {
      this.companiasSeleccionadas.push(compania);
      this.companiasDisponibles = this.companiasDisponibles.filter(c => c.id !== compania.id);
      this.cancionForm.controls['companias'].setValue([...this.companiasSeleccionadas.map(c => c.id)]);
    }
  }

  removerCompania(compania: any) {
    this.companiasSeleccionadas = this.companiasSeleccionadas.filter(c => c.id !== compania.id);
    this.companiasDisponibles = [...this.companiasDisponibles, compania].sort((a, b) => a.id - b.id);
    this.cancionForm.controls['companias'].setValue(this.companiasSeleccionadas.map(c => c.id));

  }

  guardar() {
    this.isLoading = true;
    if (this.cancionForm.valid) {
      const song: Song = {
        id: this.idSongLast,
        title: this.cancionForm.controls['titulo'].value,
        genre: this.cancionForm.controls['generos'].value,
        artist: this.cancionForm.controls['artistas'].value,
        duration: this.cancionForm.controls['duracion'].value,
        rating: this.cancionForm.controls['rating'].value,
        poster: this.generateUrlColor(),
        year: this.cancionForm.controls['anio'].value,
      }
      this.musicaService.saveSong(song).subscribe({
        next: (res) => {
          this.modificarArtist();
        },
        error: (e) => {
          console.error(e)
        }
      })

    }
  }

  modificarArtist() {
    const id = this.cancionForm.controls['artistas'].value;
    let find = this.artistas.find((x) => x.id == id);
    if (find) {
      find.songs.push(this.idSongLast);
      this.musicaService.updateArtist(id, find).subscribe({
        next: (res) => {
          const ids = this.cancionForm.controls['companias'].value;
          if (ids.length > 0) {
            this.modificarCompany();
          }
          else {
            this.limpiarFormulario();
          }
        },
        error: (e) => {
          console.error(e)
        }
      })
    }
  }

  modificarCompany() {
    const ids = this.cancionForm.controls['companias'].value;
    ids.map((x: any) => {
      let find = this.companies.find((f) => f.id == x);
      if (find) {
        find.songs.push(this.idSongLast);
        this.musicaService.updateCompanies(x, find).subscribe({
          next: (res) => {
            this.limpiarFormulario();
          },
          error: (e) => {
            console.error(e)
          }
        })
      }
    })

  }

  limpiarFormulario() {
    this.store.dispatch(new MusicaActions.Refresh());
    this.isLoading = false;
    this.cancionForm.reset();
    this.generosSeleccionados = [];
    this.companiasSeleccionadas = [];
    this.cancionForm.controls['generos'].setValue([]);
    this.cancionForm.controls['companias'].setValue([]);
  }

  generateUrlColor(): string {
    let newColor: string;
    newColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    return `http://dummyimage.com/400x600.png/${newColor}/ffffff`;;
  }

  validarAnio() {
    let valor = this.cancionForm.controls['anio'].value;
    if (valor && valor.toString().length > 4) {
      this.cancionForm.controls['anio'].setValue(parseInt(valor.toString().slice(0, 4), 10));
    }
  }

  redirect() {
    this.router.navigate(['/']);
  }
}
