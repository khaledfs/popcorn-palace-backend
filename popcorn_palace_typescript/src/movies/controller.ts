import {
  Body,
  Controller,
  Get,
  Delete,
  HttpCode,
  Post,
  Param,
} from '@nestjs/common';
import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { MoviesService } from './service';

class CreateMovieDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  genre: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  duration: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @Type(() => Number)
  @IsInt()
  releaseYear: number;
}

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('all')
  getAll() {
    return this.moviesService.findAll();
  }

  @Post()
  @HttpCode(200) // Override default 201 status code
  async create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Post('update/:movieTitle')
  @HttpCode(200) // Override default 201 status code
  async updateByTitle(
    @Param('movieTitle') movieTitle: string,
    @Body() body: any,
  ) {
    return this.moviesService.updateByTitle(movieTitle, {
      title: body.title,
      genre: body.genre,
      duration: body.duration,
      rating: body.rating,
      releaseYear: body.releaseYear,
    });
  }

  @Delete(':movieTitle')
  deleteByTitle(@Param('movieTitle') movieTitle: string) {
    return this.moviesService.deleteByTitle(movieTitle);
  }
}
