import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MusicaService } from '@services/musica.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GestorDeMusica';

  canciones: any[] = [];

  constructor(private musicService: MusicaService) {}

  ngOnInit() {
    this.musicService.getSongs().subscribe(data => {
      this.canciones = data.songs;
      console.log(this.canciones)
    });
  }
}
