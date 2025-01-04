import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto, UpdatePropertyDto } from './dtos';
import { PropertiesServiceDb } from './services';
import { PageOptionsDto, PageDto, PaginationDto } from '../common/dtos';
import { ApiPaginatedResponse } from '../common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller('properties')
@ApiTags('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesServiceDb) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get('simple-pagination')
  findAll(@Query(ValidationPipe) paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const properties = this.propertiesService.findAll(limit, offset);
    // console.log(properties);
    // console.log('Serialized:', plainToInstance(Property, properties));
    return properties;

  }
  @Get()
  @ApiPaginatedResponse(CreatePropertyDto)
  findAllPaginated(@Query() pageOptionsDto: PageOptionsDto):Promise<PageDto<CreatePropertyDto>> {
    return this.propertiesService.findAllPaginated(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertiesService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  // @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertiesService.remove(id);
  }
}
