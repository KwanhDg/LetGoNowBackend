import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) {}

    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const booking = this.bookingRepository.create(createBookingDto);
        return this.bookingRepository.save(booking);
    }

    async findAll(): Promise<Booking[]> {
        return this.bookingRepository.find();
    }

    async findOne(id: number): Promise<Booking> {
        const booking = await this.bookingRepository.findOne({ where: { id } });
        if (!booking) throw new NotFoundException(`Booking with id ${id} not found`);
        return booking;
    }

    async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
        const booking = await this.findOne(id);
        Object.assign(booking, updateBookingDto);
        return this.bookingRepository.save(booking);
    }

    async remove(id: number): Promise<void> {
        const booking = await this.findOne(id);
        await this.bookingRepository.remove(booking);
    }

    async findByUserId(user_id: string): Promise<Booking[]> {
        return this.bookingRepository.find({ where: { user_id } });
    }

    async findByYachtId(yacht_id: number): Promise<Booking[]> {
        return this.bookingRepository.find({ where: { yacht_id } });
    }
} 