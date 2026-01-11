import { Expose } from 'class-transformer';

export class MovieResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  genre: string;

  @Expose()
  duration: number;

  @Expose()
  rating: number;

  @Expose()
  releaseYear: number;
}
