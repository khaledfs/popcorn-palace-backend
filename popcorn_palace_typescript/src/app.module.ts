import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Movie } from './movies/movie.entity';
import { Showtime } from './showtimes/showtime.entity';
import { Booking } from './bookings/booking.entity';

import { MoviesController } from './movies/controller';
import { MoviesService } from './movies/service';

import { ShowtimesController } from './showtimes/controller';
import { ShowtimesService } from './showtimes/service';

import { BookingsController } from './bookings/controller';
import { BookingsService } from './bookings/service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Movie, Showtime, Booking],
      synchronize: true, // simplest for assignment (no migrations)
    }),
    TypeOrmModule.forFeature([Movie, Showtime, Booking]),
  ],
  controllers: [MoviesController, ShowtimesController, BookingsController],
  providers: [MoviesService, ShowtimesService, BookingsService],
})
export class AppModule {}
