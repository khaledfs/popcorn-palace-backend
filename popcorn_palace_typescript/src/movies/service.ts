import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async create(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.moviesRepository.create(movieData);
    return this.moviesRepository.save(movie);
  }

  async updateByTitle(movieTitle: string, data: Partial<Movie>) {
    const movie = await this.moviesRepository.findOne({
      where: { title: movieTitle },
    });
    if (!movie) throw new NotFoundException('Movie not found');

    Object.assign(movie, data);
    await this.moviesRepository.save(movie);
    return; // requirement response body empty
  }

  async deleteByTitle(movieTitle: string) {
    const result = await this.moviesRepository.delete({ title: movieTitle });
    if (result.affected === 0) throw new NotFoundException('Movie not found');
    return; // requirement response body empty
  }
}
