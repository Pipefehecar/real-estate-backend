import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesServiceDb } from '../services';
import { Property } from './entities/property.entity';
import { PropertiesController } from './properties.controller';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesServiceDb],
  imports: [TypeOrmModule.forFeature([Property])],
})
export class PropertiesModule {}
