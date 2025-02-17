import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  private dataUrl = 'assets/json/mock.json'

  constructor( private http: HttpClient) { }

  getSongs(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
}
