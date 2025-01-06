import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../common/dtos';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreatePropertyDto, UpdatePropertyDto } from '../dtos';
import {
  PropertyImage as ImageEntity,
  Property as PropertyEntity,
} from '../entities';
import { handleError } from '../../common/utils/handle-error';

@Injectable()
export class PropertiesServiceDb {
  private readonly logger = new Logger(PropertiesServiceDb.name);
  constructor(
    @InjectRepository(PropertyEntity)
    private propertyRepository: Repository<PropertyEntity>,
    @InjectRepository(ImageEntity)
    private propertyImageRepository: Repository<ImageEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    try {
      const { images = [], ...propertyDetails } = createPropertyDto;
      const newProperty = this.propertyRepository.create({
        ...propertyDetails,
        images: images.map((imageUrl) =>
          this.propertyImageRepository.create({ url: imageUrl }),
        ),
      });
      await this.propertyRepository.save(newProperty);
      return { ...newProperty, images };
    } catch (error) {
      handleError(error);
    }
  }

  public async findAllPaginated(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreatePropertyDto>> {
    const queryBuilder = this.propertyRepository.createQueryBuilder('property'); //alias
    queryBuilder
      .orderBy('property.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .leftJoinAndSelect('property.images', 'image');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    const transformedEntities = entities.map((property) => ({
      ...property,
      images: property.images.map((image) => image.url),
    }));
    return new PageDto(transformedEntities, pageMetaDto);
  }

  async findAll(limit: number, offset: number) {
    const properties = await this.propertyRepository.find({
      take: limit,
      skip: offset,
      relations: { images: true },
    });
    //* usando eager: true en la relación images no es necesario hacer el map
    // return properties.map((property) => ({
    //   ...property,
    //   images: property.images.map((image) => image.url),
    // }));

    return plainToInstance(PropertyEntity, properties);
  }

  async findOneById(id: string) {
    const property = await this.propertyRepository.findOneBy({ id });
    if (!property)
      throw new NotFoundException(`Property with id ${id} not found`);
    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    const { images = [], ...propertyDetails } = updatePropertyDto;
    const property = await this.propertyRepository.preload({
      id,
      ...propertyDetails,
    });

    if (!property)
      throw new NotFoundException(`Property with id ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      // Actualizar imágenes
      if ( images )
        await this.updatePropertyImages(property, images, queryRunner.manager);

      // Guardar la propiedad actualizada
      await queryRunner.manager.save(property);

      await queryRunner.commitTransaction();

    } catch (error) {
      await queryRunner.rollbackTransaction();
      handleError(error);
    } finally {
      await queryRunner.release();
    }
    return { ...property, images };
  }

  private async updatePropertyImages(
    property: PropertyEntity,
    images: string[],
    manager: EntityManager,
  ) {
    // Eliminar imágenes existentes
    await manager.delete(ImageEntity, { property });

    // Si hay imágenes nuevas, asociarlas a la propiedad
    if (images.length > 0) {
      property.images = images.map((imageUrl) =>
        this.propertyImageRepository.create({ url: imageUrl, property }),
      );
    } else {
      property.images = [];
    }
  }

  async remove(id: string) {
    await this.findOneById(id);
    await this.propertyRepository.delete(id);
  }

  async deleteAll() {
    const query = this.propertyRepository.createQueryBuilder('property');
    try {
      await query.delete().execute();
    } catch (error) {
      handleError(error);
    }
    this.logger.log('All properties deleted');
    return { message: 'All properties deleted' };
  }
  
}
