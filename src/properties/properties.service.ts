import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyStatus, PropertyType } from './enums';
import { Property } from './interfaces';

@Injectable()
export class PropertiesService {
  private properties: Property[] = [
    {
      id: uuid(),
      title: 'Property One',
      description: 'This is a nice property',
      type: PropertyType.SALE, // sale | rent
      price: 100000,
      latitude: '6.5244',
      longitude: '3.3792',
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      garage: true,
      status: PropertyStatus.ACTIVE, // active | sold | rented
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
    },
    {
      id: uuid(),
      title: 'Property 2',
      description: 'This is a nice property',
      type: PropertyType.RENT, // sale | rent
      price: 5000,
      latitude: '6.5244',
      longitude: '3.3792',
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      garage: true,
      status: PropertyStatus.ACTIVE, // active | sold | rented
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
    },
    {
      id: uuid(),
      title: 'Property 3',
      description: 'This is a nice property',
      type: PropertyType.RENT, // sale | rent
      price: 200000,
      latitude: '6.5244',
      longitude: '3.3792',
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      garage: true,
      status: PropertyStatus.SOLD, // active | sold | rented
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
    },
  ];
  create(createPropertyDto: CreatePropertyDto) {
    const newProperty: Property = {
      id: uuid(),
      ...createPropertyDto,
    };
    this.properties.push(newProperty);
    return newProperty;
  }

  findAll() {
    return this.properties;
  }

  findOneById(id: string) {
    const property: Property = this.properties.find(
      (property) => property.id === id,
    );
    if (!property)
      throw new NotFoundException(`Property with id ${id} not found`);
    return property;
  }

  update(id: string, updatePropertyDto: UpdatePropertyDto) {
    let propertyDB: Property = this.findOneById(id);
    this.properties = this.properties.map((property) => {
      if (property.id === id) {
        propertyDB = {
          ...propertyDB,
          ...updatePropertyDto,
          id,
        };
        return propertyDB;
      }
    });
    return propertyDB;
  }

  remove(id: string) {
    this.findOneById(id);
    this.properties.filter( property => property.id !== id)
  }
}
