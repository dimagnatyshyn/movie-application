import { BehaviorSubject, filter } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieActionDialogComponent } from '../movie-action-dialog';
import { MoviesService } from '../../services';
import { IMovieDetails } from '../../interfaces';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  selectedMovie$ = new BehaviorSubject<IMovieDetails | null>(null);

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.moviesService.getMovieById(id).subscribe((movie) => {
        this.selectedMovie$.next(movie);
      });
    });
  }

  edit(movie: IMovieDetails) {
    const dialogRef = this.dialog.open(MovieActionDialogComponent, { data: movie });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((result) => {
        this.moviesService.updateMovie(result._id, result).subscribe(
          () => {
            console.log('Movie created successfully');
            this.selectedMovie$.next(result);
          },
          (error) => {
            console.error('Error creating movie:', error);
          },
        );
      });
  }

  delete(id: string) {
    this.moviesService.deleteMovie(id).subscribe();
  }

  getEmbeddedUrl(url: string): SafeResourceUrl {
    const videoId = url.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  convertUpdatedAt(addedAt: string) {
    const formatOneDigit = (digit = '00') => (digit.length === 1 ? 0 + digit : digit);
    const [year, month, day, hour, minutes] = addedAt.split('-');

    return `${day}.${month}.${year}  ${formatOneDigit(hour)}:${formatOneDigit(minutes)}`;
  }
}
