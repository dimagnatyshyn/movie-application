import { ISorting } from '../interfaces';

export enum SortType {
  Asc = 'asc',
  Desc = 'desc',
}
export const DEFAULT_SORTING = { field: 'addedAt', order: SortType.Desc };
export const SORT_OPTIONS: { label: string; value: ISorting }[] = [
  { label: 'Title Z-A', value: { field: 'title', order: SortType.Desc } },
  { label: 'Title A-Z', value: { field: 'title', order: SortType.Asc } },
  { label: 'Director A-Z', value: { field: 'director', order: SortType.Asc } },
  { label: 'Director Z-A', value: { field: 'director', order: SortType.Desc } },
  { label: 'Genre A-Z', value: { field: 'genre', order: SortType.Asc } },
  { label: 'Genre Z-A', value: { field: 'genre', order: SortType.Desc } },
  { label: 'Year Ascending', value: { field: 'year', order: SortType.Asc } },
  { label: 'Year Descending', value: { field: 'year', order: SortType.Desc } },
  { label: 'Added At Ascending', value: { field: 'addedAt', order: SortType.Asc } },
  { label: 'Added At Descending', value: { field: 'addedAt', order: SortType.Desc } },
];
