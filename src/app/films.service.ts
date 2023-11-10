import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { docData } from 'rxfire/firestore';
import { DocumentReference } from 'rxfire/firestore/interfaces';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { Administrator, Film } from './Film';


@Injectable({
  providedIn: 'root'
})

export class FilmsService {
  id: string = '';

  constructor(private db: Firestore, private storage: Storage) { }

  getFilms(): Observable<Film[]> {
    return collectionData<Film>(
      collection(this.db,'movie') as CollectionReference<Film>,
      {idField: 'id' }
    ).pipe(catchError(
      (err) => {
        console.log('error message: ', err);
        return throwError(() => new Error("bad things happen"));
      }

    ));
  }
  addFilm(newFilm: Film) {
    const FilmCollection = collection(this.db,'movie');
    return from(addDoc(FilmCollection, newFilm));
  }
  getFilm(id: string): Observable<Film> {
    return docData<Film>(
      doc(this.db, '/movie/' + id) as DocumentReference<Film>
    ) .pipe(
      map((data: Film | undefined) => {
        if (data === undefined) {
          throw new Error(`Film with ID ${id} not found`);
        }
        return data;
      })
    );
  }
  updateFilm(film: Film, id: string) {
    const filmRef = doc(this.db, 'movie/'+id) as DocumentReference<Film>;
    return from(updateDoc(filmRef, film));
  }
  deleteFilm(id: string) {
    const filmRef = doc(this.db, 'movie/'+id) as DocumentReference<Film>;
    return from(deleteDoc(filmRef));
  }
  async uploadImg(path: string, file: File): Promise<string> {
    const storageRef = ref(this.storage, path);
    const task = uploadBytesResumable(storageRef, file);
    await task;
    const url = await getDownloadURL(storageRef);
    return url;
  }
  createFilmId(): string {
    this.id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    return this.id;
  }
  getAdministrators(): Observable<Administrator[]> {
    return collectionData<Administrator>(
      collection(this.db,'administrator') as CollectionReference<Administrator>,
      {idField: 'id' }
    ).pipe(catchError(
      (err) => {
        console.log('error message: ', err);
        return throwError(() => new Error("bad things happen"));
      }

    ));
  }

} 

