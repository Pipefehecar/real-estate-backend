import { PropertyStatus, PropertyType } from "../enums";

export interface Property {
    id: string;
    title: string;
    description: string;
    type: PropertyType;
    price: number;
    latitude: string;
    longitude: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    garage: boolean;
    status: PropertyStatus;	
    images: string[];
}
