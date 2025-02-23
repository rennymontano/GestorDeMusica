import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Music } from '../models/music';
import { Song, SongDetails } from '../models/song';
import { Artist } from '../models/artist';
import { Company } from '../models/company';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  private dataUrl = environment.urlApi;

  constructor(private http: HttpClient) { }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.dataUrl}/songs`);
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.dataUrl}/songs/${id}`);
  }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.dataUrl}/artists`);
  }


  getArtistBySong(songId: number): Observable<Artist | null> {
    return this.http.get<Artist[]>(`${this.dataUrl}/artists`).pipe(
      map(artists => artists.find(artist => artist.songs.includes(songId)) || null)
    );
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.dataUrl}/companies`);
  }

  getCompaniesBySong(songId: number): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.dataUrl}/companies?songs_like=${songId}`).pipe(
      map(companies => companies.filter(company => company.songs.includes(songId)))
    );
  }

  getSongDetails(songId: number): Observable<SongDetails | null> {
    return this.http.get<Music>(this.dataUrl).pipe(
      map(data => {
        const song = data.songs.find(s => s.id === songId);
        if (!song) return null;

        const artist = data.artists.find(a => a.id === song.artist);
        const companies = data.companies.filter(c => c.songs.includes(songId));

        return { song, artist, companies };
      })
    );
  }

  saveSong(song: Song) {
    return this.http.post<Song>(`${this.dataUrl}/songs`, song);
  }

  updateSong(id: number, song: Song): Observable<Song> {
    return this.http.put<Song>(`${this.dataUrl}/songs/${id}`, song);
  }

  deleteSong(id: number): Observable<void> {
    return this.http.delete<void>(`${this.dataUrl}/songs/${id}`);
  }

  updateArtist(id: number, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.dataUrl}/artists/${id}`, artist);
  }

  updateCompanies(id: number, company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.dataUrl}/companies/${id}`, company);
  }
}
