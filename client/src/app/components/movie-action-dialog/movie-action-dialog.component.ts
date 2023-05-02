import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMovieDetails } from '../../interfaces';

@Component({
  selector: 'app-movie-action-dialog',
  templateUrl: './movie-action-dialog.component.html',
  styleUrls: ['./movie-action-dialog.component.scss'],
})
export class MovieActionDialogComponent {
  movieForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MovieActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMovieDetails,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  createForm() {
    this.movieForm = this.fb.group({
      title: [this.data.title, Validators.required],
      director: [this.data.director, Validators.required],
      genre: [this.data.genre, Validators.required],
      year: [this.data.year, Validators.required],
      trailerLink: [this.data.trailerLink, Validators.required],
      imageLink: [this.data.imageLink, Validators.required],
      country: [this.data.country, Validators.required],
      description: [this.data.description, Validators.required],
      _id: this.data._id,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const movie = { ...this.movieForm.value, addedAt: this.getCreatedAt() };

    this.dialogRef.close(movie);
  }

  getCreatedAt() {
    const d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day, hours, minutes].join('-');
  }
}
