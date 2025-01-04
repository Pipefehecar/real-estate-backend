import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property, PropertyImage } from './entities';
import { PropertiesController } from './properties.controller';
import { PropertiesServiceDb } from './services';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesServiceDb],
  imports: [TypeOrmModule.forFeature([Property, PropertyImage])],
})
export class PropertiesModule {}
