import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column('int')
  duration: number; // minutes

  @Column('float')
  rating: number; // 0-10

  @Column('int')
  releaseYear: number;
}
