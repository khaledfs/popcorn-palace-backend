import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Showtime } from '../showtimes/showtime.entity';

type CreateBookingInput = {
    showtimeId: number;
    seatNumber: number;
    userId: number;

};

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingsRepository: Repository<Booking>,
        @InjectRepository(Showtime)
        private readonly showtimesRepository: Repository<Showtime>,
    ) { }

    async book(input: CreateBookingInput): Promise<Booking> {
        const showtime = await this.showtimesRepository.findOne({
            where: { id: input.showtimeId }
        });
        
        if (!showtime) {
            throw new NotFoundException(`Showtime with ID ${input.showtimeId} not found`);
        }
        const booking = this.bookingsRepository.create({
            showtime: showtime,
            seatNumber: input.seatNumber,
            userId: input.userId,
        });
        try {
            return await this.bookingsRepository.save(booking);
        } catch (error) {
            if (error?.code === '23505') { // unique violation
                throw new ConflictException(`Seat ${input.seatNumber} is already booked for this showtime`);
            }
            throw error;
        }
    }
}

