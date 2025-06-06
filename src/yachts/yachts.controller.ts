import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { YachtsService } from './yachts.service';
import { CreateYachtDto } from './dto/create-yacht.dto';
import { UpdateYachtDto } from './dto/update-yacht.dto';

@ApiTags('yachts')
@Controller('yachts')
export class YachtsController {
    constructor(private readonly yachtsService: YachtsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new yacht' })
    @ApiResponse({ status: 201, description: 'The yacht has been successfully created.' })
    create(@Body() createYachtDto: CreateYachtDto) {
        return this.yachtsService.create(createYachtDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all yachts with filters' })
    @ApiResponse({ status: 200, description: 'Return filtered yachts.' })
    findAll(
        @Query('q') searchQuery?: string,
        @Query('price') priceRange?: string,
        @Query('rating') ratings?: string,
        @Query('facilities') facilities?: string,
        @Query('shipType') shipTypes?: string,
    ) {
        return this.yachtsService.findAll({
            searchQuery,
            priceRange,
            ratings: ratings ? ratings.split(',').map(Number) : undefined,
            facilities: facilities ? facilities.split(',') : undefined,
            shipTypes: shipTypes ? shipTypes.split(',') : undefined,
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a yacht by id' })
    @ApiResponse({ status: 200, description: 'Return the yacht.' })
    @ApiResponse({ status: 404, description: 'Yacht not found.' })
    findOne(@Param('id') id: string) {
        return this.yachtsService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a yacht' })
    @ApiResponse({ status: 200, description: 'The yacht has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Yacht not found.' })
    update(@Param('id') id: string, @Body() updateYachtDto: UpdateYachtDto) {
        return this.yachtsService.update(+id, updateYachtDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a yacht' })
    @ApiResponse({ status: 200, description: 'The yacht has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Yacht not found.' })
    remove(@Param('id') id: string) {
        return this.yachtsService.remove(+id);
    }
} 