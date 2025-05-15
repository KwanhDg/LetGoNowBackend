import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new booking' })
    @ApiResponse({ status: 201, type: Booking })
    create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingService.create(createBookingDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all bookings' })
    @ApiResponse({ status: 200, type: [Booking] })
    findAll() {
        return this.bookingService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a booking by id' })
    @ApiResponse({ status: 200, type: Booking })
    findOne(@Param('id') id: string) {
        return this.bookingService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a booking' })
    @ApiResponse({ status: 200, type: Booking })
    update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
        return this.bookingService.update(+id, updateBookingDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a booking' })
    @ApiResponse({ status: 200 })
    remove(@Param('id') id: string) {
        return this.bookingService.remove(+id);
    }

    @Get('user/:user_id')
    @ApiOperation({ summary: 'Get bookings by user id' })
    @ApiResponse({ status: 200, type: [Booking] })
    findByUserId(@Param('user_id') user_id: string) {
        return this.bookingService.findByUserId(user_id);
    }

    @Get('yacht/:yacht_id')
    @ApiOperation({ summary: 'Get bookings by yacht id' })
    @ApiResponse({ status: 200, type: [Booking] })
    findByYachtId(@Param('yacht_id') yacht_id: string) {
        return this.bookingService.findByYachtId(+yacht_id);
    }
} 