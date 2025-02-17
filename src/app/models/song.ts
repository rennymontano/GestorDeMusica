import { Artist } from "./artist";
import { Company } from "./company";

export class Song {
    id: number;
    title: string;
    poster: string;
    genre: string[];
    year: number;
    duration: number;
    rating: number;
    artist: number;
}

export class SongDetails {
    song: Song;
    artist: Artist | undefined;
    companies: Company[];
  }