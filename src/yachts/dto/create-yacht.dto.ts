import { IsString, IsOptional, IsNumber, Min, IsArray, IsInt, Max, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateYachtDto {
    @ApiProperty({ description: 'The name of the yacht' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'The description of the yacht', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'The price of the yacht', required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @ApiProperty({ description: 'Array of image URLs', required: false, type: [String] })
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @IsOptional()
    images?: string[];

    @ApiProperty({ description: 'Status of the yacht', required: false, enum: ['available', 'booked', 'maintenance'] })
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty({ description: 'Rating of the yacht (0-5)', required: false })
    @IsNumber()
    @Min(0)
    @Max(5)
    @IsOptional()
    rating?: number;

    @ApiProperty({ description: 'Number of reviews', required: false })
    @IsInt()
    @Min(0)
    @IsOptional()
    review_count?: number;

    @ApiProperty({ description: 'Location of the yacht', required: false })
    @IsString()
    @IsOptional()
    location?: string;

    @ApiProperty({ description: 'Launch year of the yacht', required: false })
    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear())
    @IsOptional()
    launch_year?: number;

    @ApiProperty({ description: 'Type of the yacht', required: false })
    @IsString()
    @IsOptional()
    ship_type?: string;

    @ApiProperty({ description: 'Array of facilities available', required: false, type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    facilities?: string[];
} 