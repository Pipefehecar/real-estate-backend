import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property, PropertyImage } from './entities';
import { PropertiesController } from './properties.controller';
import { PropertiesServiceDb } from './services';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesServiceDb],
  imports: [TypeOrmModule.forFeature([Property, PropertyImage])],
  exports: [PropertiesServiceDb, TypeOrmModule],// si necesitamos usar los repositorios en otros modulos
})
export class PropertiesModule {}
