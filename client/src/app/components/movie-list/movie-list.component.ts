import { Observable, map, startWith, takeWhile, filter, switchMap, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MovieActionDialogComponent } from '../movie-action-dialog';
import { MoviesService } from '../../services';
import { IMovie } from '../../interfaces';
import { DEFAULT_SORTING, SORT_OPTIONS } from '../../constants';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: IMovie[] = [];
  filteredMovies$!: Observable<IMovie[]>;
  sortOptions = SORT_OPTIONS;
  searchControl = new FormControl('');
  sortControl = new FormControl();

  private alive = true;

  constructor(
    private moviesService: MoviesService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.moviesService
      .getAllMovies()
      .pipe(takeWhile(() => this.alive))
      .subscribe();
    this.setMovieList();
    this.watchSearch();
    this.watchSorting();
    this.navigateToFirstItem();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  updateMovies(value: string): IMovie[] {
    const filterValue = value.toLowerCase();

    return this.movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(filterValue) ||
        movie.director.toLowerCase().includes(filterValue) ||
        movie.genre.toLowerCase().includes(filterValue) ||
        movie.year.toString().includes(filterValue),
    );
  }

  add() {
    const dialogRef = this.dialog.open(MovieActionDialogComponent, { data: {} });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((result) =>
          this.moviesService.createMovie(result).pipe(tap(() => this.router.navigate(['/movie', result._id]))),
        ),
      )
      .subscribe();
  }

  private watchSorting() {
    this.sortControl.valueChanges
      .pipe(
        startWith(DEFAULT_SORTING),
        takeWhile(() => this.alive),
        filter(Boolean),
      )
      .subscribe((value) => this.moviesService.updateSorting(value));
  }

  private watchSearch() {
    this.moviesService.movies$.pipe(takeWhile(() => this.alive)).subscribe((movies) => {
      this.movies = movies;
      this.setMovieList();
      this.navigateToFirstItem();
    });
  }

  private setMovieList() {
    this.filteredMovies$ = this.searchControl.valueChanges.pipe(startWith('')).pipe(
      takeWhile(() => this.alive),
      map((value) => this.updateMovies(value as string)),
    );
  }

  private navigateToFirstItem() {
    this.route.params.subscribe((params) => {
      if (window.location.href === window.location.origin + '/') {
        this.movies[0] && this.router.navigate(['/movie', this.movies[0]._id]);
      }
    });
  }
}
