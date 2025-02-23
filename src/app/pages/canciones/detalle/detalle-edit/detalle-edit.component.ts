import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCustomModule } from '@modules/mat-custom/mat-custom.module';
import { MusicaService } from '@services/musica.service';
import { SkeletonEditarComponent } from '@skeletons/skeleton-editar/skeleton-editar.component';
import { SkeletonNuevaComponent } from '@skeletons/skeleton-nueva/skeleton-nueva.component';
import { plainToInstance } from 'class-transformer';
import { forkJoin } from 'rxjs';
import { Artist } from 'src/app/models/artist';
import { Company } from 'src/app/models/company';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-detalle-edit',
  standalone: true,
  imports: [MatCustomModule, ReactiveFormsModule, SkeletonEditarComponent],
  templateUrl: './detalle-edit.component.html',
  styleUrl: './detalle-edit.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetalleEditComponent {
  @Input() cancion: Song = new Song();
  @Input() companias: Company[] = [];
  @Input() artista: Artist = new Artist();
  @Output() onCancelar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onGuardar: EventEmitter<Company[]> = new EventEmitter<Company[]>();

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
    private musicaService: MusicaService
  ) {
    this.cancionForm = this.fb.group({
      generos: [[], [Validators.required]],
      companias: [[], [Validators.required]],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(this.anioActual)]],
      pais: ['', [Validators.required, Validators.minLength(3)]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    this.getSongs();
  }

  cargarEdit() {
    this.generosSeleccionados = this.cancion.genre;
    this.generosDisponibles = this.generosDisponibles.filter((x) => !this.generosSeleccionados.includes(x));
    this.cancionForm.controls['generos'].setValue([...this.generosSeleccionados]);

    this.companiasSeleccionadas = this.companias;
    this.companiasDisponibles = this.companiasDisponibles.filter((x) => !this.companiasSeleccionadas.some((s) => s.id == x.id));
    this.cancionForm.controls['companias'].setValue([...this.companiasSeleccionadas]);

    this.cancionForm.controls['anio'].setValue(this.cancion.year);
    this.cancionForm.controls['pais'].setValue(this.artista.bornCity);
    this.cancionForm.controls['rating'].setValue(this.cancion.rating);
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

        this.cargarEdit();
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
      this.cancion.genre = this.cancionForm.controls['generos'].value;
      this.cancion.year = this.cancionForm.controls['anio'].value;
      this.cancion.rating = this.cancionForm.controls['rating'].value,
        this.musicaService.updateSong(this.cancion.id, this.cancion).subscribe({
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
    this.artista.bornCity = this.cancionForm.controls['pais'].value;
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
    const auxConmpany = this.fitrarComapanies(this.cancion.id);

    const requests = auxConmpany.map((x: any) => {
      return this.musicaService.updateCompanies(x.id, x);
    });

    forkJoin(requests).subscribe({
      next: () => {
        this.limpiarFormulario();
        this.isLoading = false;
        this.onGuardar.emit(auxConmpany);
      },
      error: (e) => {
        console.error(e);
      }
    });

  }

  fitrarComapanies(idSong: number) {
    const unionCompanies = [
      ...new Map([...this.companias, ...this.companiasSeleccionadas].map(c => [c.id, c])).values()
    ];

    const ids = this.cancionForm.controls['companias'].value;
    unionCompanies.map((x) => {
      console.log(x)
      if (ids.includes(x.id)) {
        if (!x.songs.includes(idSong)) {
          x.songs.push(idSong);
        }
      } else {
        if (x.songs.includes(idSong)) {
          x.songs = x.songs.filter((s: any) => s != idSong);
        }
      }
    })
    return unionCompanies;
  }

  limpiarFormulario() {
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

  onCancelarEdit() {
    this.onCancelar.emit(false);
  }

}
