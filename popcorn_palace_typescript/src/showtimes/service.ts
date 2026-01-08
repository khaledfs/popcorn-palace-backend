import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Showtime } from './showtime.entity';
import { Movie } from '../movies/movie.entity';
import { Type } from 'class-transformer';

type CreateShowtimeInput = {
    movieId: number;
    price: number;
    theater: string;
    startTime: Date;
    endTime: Date;
};


@Injectable()
export class ShowtimesService {
    constructor(
        @InjectRepository(Showtime)
        private readonly showtimesRepository: Repository<Showtime>,
        @InjectRepository(Movie)
        private readonly moviesRepository: Repository<Movie>,
    ) { }

    async create(input: CreateShowtimeInput): Promise<Showtime> {
        const movie = await this.moviesRepository.findOne({ where: { id: input.movieId } });
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${input.movieId} not found`);
        }

        const overlap = await this.showtimesRepository.createQueryBuilder('showtime')
            .where('showtime.theater = :theater', { theater: input.theater })
            .andWhere('showtime.startTime < :endTime AND showtime.endTime > :startTime', {
                startTime: input.startTime,
                endTime: input.endTime,
            })
            .getOne();
        if (overlap) {
            throw new ConflictException(`Showtime overlaps with existing showtime in theater ${input.theater}`);
        }
        const showtime = this.showtimesRepository.create({
            movieId: movie,
            price: input.price,
            theater: input.theater,
            startTime: input.startTime,
            endTime: input.endTime,
        });
        return this.showtimesRepository.save(showtime);
    }


    async getById(id: number): Promise<Showtime> {
        const showtime = await this.showtimesRepository.findOne({ where: { id } });
        if (!showtime) {
            throw new NotFoundException(`Showtime with ID ${id} not found`);
        }
        return showtime;
    }

    async update(showtimeId: number, data: CreateShowtimeInput) {
        const showtime = await this.showtimesRepository.findOne({ where: { id: showtimeId } });
        if (!showtime) {
            throw new NotFoundException('Showtime not found');
        }

        const movie = await this.moviesRepository.findOne({ where: { id: data.movieId } });
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${data.movieId} not found`);
        }
        const overlap = await this.showtimesRepository.createQueryBuilder('showtime')
            .where('showtime.theater = :theater', { theater: data.theater })
            .andWhere('showtime.startTime < :endTime AND showtime.endTime > :startTime', {
                startTime: data.startTime,
                endTime: data.endTime,
            })
            .andWhere('showtime.id != :showtimeId', { showtimeId })
            .getOne();
        if (overlap) {
            throw new ConflictException(`Showtime overlaps with existing showtime in theater ${data.theater}`);
        }
        showtime.movieId = movie;
        showtime.theater = data.theater;
        showtime.startTime = data.startTime;
        showtime.endTime = data.endTime;
        showtime.price = data.price;
        const saved = await this.showtimesRepository.save(showtime);
        return saved;

    }
    async remove(showtimeId: number) {
        const result = await this.showtimesRepository.delete({ id: showtimeId });
        if (result.affected === 0) {
            throw new NotFoundException('Showtime not found');
        }

    }
}
