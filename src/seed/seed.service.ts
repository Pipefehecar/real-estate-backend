import { Injectable } from '@nestjs/common';
import { PropertiesServiceDb } from '../properties/services';
import { seedData } from './data/seed-data-600';

@Injectable()
export class SeedService {
  constructor(private readonly propertyService: PropertiesServiceDb) {}
  runSeed() {
    this.insertNewProperties();
    return 'SEED EXECUTED';
  }

  private async insertNewProperties() {
    // Eliminar todas las propiedades existentes
    await this.propertyService.deleteAll();

    // Iterar sobre los datos del JSON y agregar cada propiedad
    for (const property of seedData) {
      await this.propertyService.create(property);
    }
  }
}
