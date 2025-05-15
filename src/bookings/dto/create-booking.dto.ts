import { IsString, IsUUID, IsNumber, IsInt, IsOptional, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsUUID()
    user_id?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    yacht_id?: number;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    booking_date: Date;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty()
    @IsNumber()
    total_price: number;

    @ApiProperty()
    @IsInt()
    number_of_guests: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    special_requests?: string;

    @ApiProperty()
    @IsString()
    service_type: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    flight_number?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    flight_from?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    flight_to?: string;

    @ApiProperty({ required: false, type: String })
    @IsOptional()
    @Type(() => Date)
    departure_date?: Date;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    airline?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    customer_name?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    customer_email?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    customer_phone?: string;
} 