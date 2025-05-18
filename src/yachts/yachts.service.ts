import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { Yacht } from './entities/yacht.entity';
import { CreateYachtDto } from './dto/create-yacht.dto';
import { UpdateYachtDto } from './dto/update-yacht.dto';

interface FindAllOptions {
    searchQuery?: string;
    priceRange?: string;
    ratings?: number[];
    facilities?: string[];
    shipTypes?: string[];
}

@Injectable()
export class YachtsService {
    constructor(
        @InjectRepository(Yacht)
        private yachtsRepository: Repository<Yacht>,
    ) {}

    create(createYachtDto: CreateYachtDto) {
        const yacht = this.yachtsRepository.create(createYachtDto);
        return this.yachtsRepository.save(yacht);
    }

    async findAll(options: FindAllOptions = {}) {
        const queryBuilder = this.yachtsRepository.createQueryBuilder('yacht')
            .leftJoinAndSelect('yacht.rooms', 'room');

        // Search by name
        if (options.searchQuery) {
            queryBuilder.andWhere('yacht.name LIKE :searchQuery', {
                searchQuery: `%${options.searchQuery}%`,
            });
        }

        // Filter by price range
        if (options.priceRange) {
            const [min, max] = options.priceRange.split('-').map(Number);
            if (min) {
                queryBuilder.andWhere('yacht.price >= :minPrice', { minPrice: min * 1000000 });
            }
            if (max) {
                queryBuilder.andWhere('yacht.price <= :maxPrice', { maxPrice: max * 1000000 });
            }
        }

        // Filter by rating
        if (options.ratings?.length) {
            queryBuilder.andWhere('yacht.rating IN (:...ratings)', { ratings: options.ratings });
        }

        // Filter by facilities
        if (options.facilities?.length) {
            queryBuilder.andWhere('yacht.facilities @> :facilities', {
                facilities: options.facilities,
            });
        }

        // Filter by ship type
        if (options.shipTypes?.length) {
            queryBuilder.andWhere('yacht.ship_type IN (:...shipTypes)', {
                shipTypes: options.shipTypes,
            });
        }

        return queryBuilder.getMany();
    }

    async findOne(id: number) {
        const yacht = await this.yachtsRepository.findOne({ where: { id }, relations: ['rooms'] });
        if (!yacht) {
            throw new NotFoundException(`Yacht with ID ${id} not found`);
        }
        return yacht;
    }

    async update(id: number, updateYachtDto: UpdateYachtDto) {
        const yacht = await this.findOne(id);
        Object.assign(yacht, updateYachtDto);
        return this.yachtsRepository.save(yacht);
    }

    async remove(id: number) {
        const yacht = await this.findOne(id);
        return this.yachtsRepository.remove(yacht);
    }
} 