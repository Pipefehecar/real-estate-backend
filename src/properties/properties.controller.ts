import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PropertiesServiceDb } from '../services';
import { CreatePropertyDto } from './dtos';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesServiceDb) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll(@Query(ValidationPipe) paginationDto: PaginationDto) {
    console.log(paginationDto);
    const { limit = 10, offset = 0 } = paginationDto;
    return this.propertiesService.findAll(limit, offset);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertiesService.findOneById(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updatePropertyDto: UpdatePropertyDto,
  // ) {
  //   return this.propertiesService.update(id, updatePropertyDto);
  // }

  @Delete(':id')
  // @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertiesService.remove(id);
  }
}
