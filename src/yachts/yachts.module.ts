import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YachtsService } from './yachts.service';
import { YachtsController } from './yachts.controller';
import { Yacht } from './entities/yacht.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Yacht])],
    controllers: [YachtsController],
    providers: [YachtsService],
    exports: [YachtsService],
})
export class YachtsModule {} 