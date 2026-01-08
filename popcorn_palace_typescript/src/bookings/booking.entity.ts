import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Showtime } from '../showtimes/showtime.entity';

@Entity()
@Unique(['showtime', 'seatNumber']) // no seat twice for same showtime
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @ManyToOne(() => Showtime, { onDelete: 'CASCADE', eager: true })
  showtime: Showtime;

  @Column({ type: 'int' })
  seatNumber: number;

  @Column()
  userId: number;
}
