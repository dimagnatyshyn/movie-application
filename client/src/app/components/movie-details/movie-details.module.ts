import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [MovieDetailsComponent],
  exports: [MovieDetailsComponent],
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
})
export class MovieDetailsModule {}
