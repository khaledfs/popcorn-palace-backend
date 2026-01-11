import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';
import { BookingsService } from './service';

class CreateBookingDto {
  @IsNumber()
  showtimeId: number;

  @Type(() => Number)
  @Min(1) // assuming seat numbers start from 1
  @IsNumber() // ensure it's a number
  seatNumber: number;

  @IsNumber()
  @Min(1) // assuming user IDs start from 1
  userId: number;
}

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()  // Create a new booking
  @HttpCode(200) // Override default 201 status code
  async book(@Body() body: CreateBookingDto) {
    const bookingId = await this.bookingsService.book({
      showtimeId: body.showtimeId,
      seatNumber: body.seatNumber,
      userId: body.userId,
    });
    return { bookingId };
  }
}
