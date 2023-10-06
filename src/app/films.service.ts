import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from './film';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  //alle films
  getFilms(): Observable<Film[]> {
    const url = 'http://localhost:3000/films';
    return this.http.get<Film[]>(url);
  }
  addFilm(film: Film): Observable<Film> {
    const url = 'http://localhost:3000/films';
    return this.http.post<Film>(url, film);
  }
  getFilm(id: number): Observable<Film> {
    const url = 'http://localhost:3000/films/' + id;
    return this.http.get<Film>(url);
  }
  updateFilm(film: Film): Observable<Film> {
    const url = 'http://localhost:3000/films/' + film.id;
    return this.http.put<Film>(url, film);
  }
  deleteFilm(id: number): Observable<any> {
    const url = 'http://localhost:3000/films/' + id;
    return this.http.delete<Film>(url);
  }
}

