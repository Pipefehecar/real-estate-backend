import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { PropertiesController } from './properties.controller';
import { PropertiesServiceDb } from './services';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesServiceDb],
  imports: [TypeOrmModule.forFeature([Property])],
})
export class PropertiesModule {}
