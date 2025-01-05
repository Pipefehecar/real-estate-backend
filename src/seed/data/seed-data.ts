import { PropertyStatus,PropertyType } from '../../properties/enums';

export const seedData = [
    {
        "title": "Luxury Villa",
        "description": "A beautiful villa with ocean view.",
        "type": PropertyType.SALE,
        "price": 5000000,
        "latitude": "34.0522",
        "longitude": "-118.2437",
        "bedrooms": 5,
        "bathrooms": 4,
        "area": 350,
        "garage": true,
        "status": PropertyStatus.ACTIVE,
        "slug": "luxury-villa",
        "images": [
            "https://example.com/images/villa1.jpg",
            "https://example.com/images/villa2.jpg"
        ]
    },
    {
        "title": "Downtown Apartment",
        "description": "Modern apartment in the city center.",
        "type": PropertyType.RENT,
        "price": 1500,
        "latitude": "40.7128",
        "longitude": "-74.0060",
        "bedrooms": 2,
        "bathrooms": 1,
        "area": 80,
        "garage": false,
        "status": PropertyStatus.ACTIVE,
        "slug": "downtown-apartment",
        "images": [
            "https://example.com/images/apartment1.jpg",
            "https://example.com/images/apartment2.jpg"
        ]
    }
]