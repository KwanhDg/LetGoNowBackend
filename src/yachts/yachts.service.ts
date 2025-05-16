import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Yacht } from './entities/yacht.entity';
import { CreateYachtDto } from './dto/create-yacht.dto';
import { UpdateYachtDto } from './dto/update-yacht.dto';

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

    findAll() {
        return this.yachtsRepository.find();
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