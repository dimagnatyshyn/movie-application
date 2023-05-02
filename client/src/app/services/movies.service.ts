import { BehaviorSubject, catchError, combineLatest, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie, IMovieDetails, ISorting } from '../interfaces';
import { DEFAULT_SORTING } from '../constants';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'http://localhost:3000/api/movies';
  movies$ = new BehaviorSubject<IMovie[]>([]);
  sortOrder$ = new BehaviorSubject<ISorting>(DEFAULT_SORTING);
  refresh$ = new BehaviorSubject(true);

  constructor(private http: HttpClient, private router: Router, private snackBarService: SnackBarService) {}

  getAllMovies() {
    return combineLatest([this.sortOrder$, this.refresh$]).pipe(
      switchMap(([{ field, order }]) => this.http.get<IMovie[]>(`${this.apiUrl}?field=${field}&order=${order}`)),
      tap((movies) => {
        this.movies$.next(movies);
      }),
      catchError((err) => {
        this.snackBarService.showError('Failed to retrieve the list of movies.');

        return of(err);
      }),
    );
  }

  getMovieById(id: number): Observable<IMovieDetails> {
    return this.http.get<IMovieDetails>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        this.snackBarService.showError(`Failed to retrieve movie with ID ${id}.`);

        return throwError(err);
      }),
    );
  }

  createMovie(movie: IMovieDetails): Observable<IMovieDetails> {
    return this.http.post<IMovieDetails>(this.apiUrl, movie).pipe(
      catchError((err) => {
        this.snackBarService.showError('Failed to add movie. Please try again.');

        return throwError(err);
      }),
      tap(() => {
        this.refresh$.next(true);
        this.snackBarService.showSuccess('Movie added successfully!');
      }),
    );
  }

  updateMovie(id: number, movie: IMovieDetails): Observable<IMovieDetails> {
    return this.http.put<IMovieDetails>(`${this.apiUrl}/${id}`, movie).pipe(
      catchError((err) => {
        this.snackBarService.showError('Failed to update movie. Please try again.');

        return throwError(err);
      }),
      tap(() => {
        this.refresh$.next(true);
        this.snackBarService.showSuccess('Movie updated successfully!');
      }),
    );
  }

  deleteMovie(id: string): Observable<IMovieDetails> {
    return this.http.delete<IMovieDetails>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        this.snackBarService.showError('Failed to delete movie. Please try again.');

        return throwError(err);
      }),
      tap(() => {
        this.snackBarService.showSuccess('Movie deleted successfully!');
        this.refresh$.next(true), this.router.navigate(['/movie', this.movies$.value[0]._id]);
      }),
    );
  }

  updateSorting(sortValue: ISorting) {
    this.sortOrder$.next(sortValue);
  }
}
