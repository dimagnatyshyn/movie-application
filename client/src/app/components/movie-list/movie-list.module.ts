import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MovieListComponent } from './movie-list.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MovieActionDialogModule } from '../movie-action-dialog';

@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MovieActionDialogModule,
  ],
  exports: [MovieListComponent],
})
export class MovieListModule {}
