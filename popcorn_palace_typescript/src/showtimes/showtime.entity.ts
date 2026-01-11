import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric')
  price: number;

  @Column({ name: 'movie_id', type: 'int' })
  movieId: number;

  @Column()
  theater: string;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;
}
