import { SortType } from '../constants';

export interface IMovie {
  title: string;
  director: string;
  genre: string;
  year: number;
  addedAt: string;
  _id: string;
}

export interface IMovieDetails extends IMovie {
  trailerLink: string;
  imageLink: string;
  country: string;
  description: string;
}

export interface ISorting {
  field: string;
  order: SortType;
}
