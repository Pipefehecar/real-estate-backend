import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageOptionsDto, PageMetaDto } from '../../common/dtos';
import { Repository } from 'typeorm';
import { CreatePropertyDto, UpdatePropertyDto } from '../dtos';
import { Property as PropertyEntity } from '../entities/property.entity';

@Injectable()
export class PropertiesServiceDb {
  private readonly logger = new Logger(PropertiesServiceDb.name);
  constructor(
    @InjectRepository(PropertyEntity)
    private propertyRepository: Repository<PropertyEntity>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    try {
      const newProperty = this.propertyRepository.create(createPropertyDto);
      await this.propertyRepository.save(newProperty);
      return newProperty;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findAllPaginated(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreatePropertyDto>> {
    const queryBuilder = this.propertyRepository.createQueryBuilder('property');
    queryBuilder
      .orderBy('property.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
      
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findAll(limit: number, offset: number) {
    return await this.propertyRepository.find({ take: limit, skip: offset });
  }

  async findOneById(id: string) {
    const property = this.propertyRepository.findOneBy({ id });
    if (!property) console.log('Property with id ${id} not found');
      throw new NotFoundException(`Property with id ${id} not found`);
    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    this.findOneById(id);
    try {
      return this.propertyRepository.update(id, updatePropertyDto);
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    this.findOneById(id);
    await this.propertyRepository.delete(id);
  }

  private handleError(error: any) {
    console.log(error);
    const exception_codes = {
      '23502': 'Not null violation',
      '23505': 'Unique violation',
    };
    for (const code in exception_codes) {
      if (error.code === code)
        throw new BadRequestException(exception_codes[code]);
    }
    this.logger.error(error.message, error.stack);
    throw new InternalServerErrorException('Unexpected error occurred');
  }
}
