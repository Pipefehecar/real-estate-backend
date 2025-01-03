import { ArrayUnique, IsBoolean, IsEnum, IsLongitude, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";
import { PropertyStatus, PropertyType } from "../enums";

export class CreatePropertyDto {
    @IsString()
    @MinLength(10)
    title: string;
    @IsString()
    @MinLength(10)
    description: string;
    @IsEnum(PropertyType)
    type: PropertyType;
    @IsNumber()
    @IsPositive()
    price: number;
    @IsLongitude()
    @IsOptional()
    latitude: string;
    @IsLongitude()
    @IsOptional()
    longitude: string;
    @IsNumber()
    @IsPositive()
    bedrooms: number;
    @IsNumber()
    @IsPositive()
    bathrooms: number;
    @IsNumber()
    @IsPositive()
    @Min(10)
    area: number;
    @IsBoolean()
    garage: boolean;
    @IsEnum(PropertyStatus)
    status: PropertyStatus;
    @ArrayUnique()
    @IsString({ each: true })
    images: string[];
    @IsString()
    @IsOptional()
    @MinLength(8)
    slug: string;
}
