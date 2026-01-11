import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsDate, Min, MinLength } from 'class-validator';
import { ShowtimesService } from './service';

class CreateOrUpdateShowtimeDto {
  @IsNotEmpty()
  @IsNumber()
  movieId: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1) // at least 1 character
  theater: string;

  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  endTime: Date;
}

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  // GET /showtimes/{showtimeId}
  @Get(':showtimeId')
  getById(@Param('showtimeId') showtimeId: number) {
    return this.showtimesService.getById(showtimeId);
  }

  // POST /showtimes
  @Post()
  @HttpCode(200) // Override default 201 status code
  create(@Body() body: CreateOrUpdateShowtimeDto) {
    return this.showtimesService.create({
      movieId: body.movieId,
      price: body.price,
      theater: body.theater,
      startTime: body.startTime,
      endTime: body.endTime,
    });
  }

  // POST /showtimes/update/{showtimeId}
  @Post('update/:showtimeId')
  @HttpCode(200) // Override default 201 status code
  update(
    @Param('showtimeId') showtimeId: number,
    @Body() body: CreateOrUpdateShowtimeDto,
  ) {
    return this.showtimesService.update(showtimeId, {
      movieId: body.movieId,
      theater: body.theater,
      startTime: body.startTime,
      endTime: body.endTime,
      price: body.price,
    } as any);
  }

  // DELETE /showtimes/{showtimeId}
  @Delete(':showtimeId')
  async remove(@Param('showtimeId') showtimeId: number) {
    await this.showtimesService.remove(showtimeId);
    return;
  }
}
