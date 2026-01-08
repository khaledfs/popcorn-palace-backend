import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric')
  price: number;

  @ManyToOne(() => Movie, { onDelete: 'CASCADE', eager: true })
  movieId: Movie;

  @Column()
  theater: string;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;
}
