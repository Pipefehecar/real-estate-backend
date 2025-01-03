import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, Min } from "class-validator";
import { Order } from "../enums";
import { Type } from "class-transformer";

export class PageOptionsDto {
    @ApiPropertyOptional({ enum: Order, default: Order.ASC })
    @IsEnum(Order)
    readonly order?: Order = Order.ASC;
    @ApiPropertyOptional({
        default: 1,
        minimum: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()    
    readonly page?: number = 1;
    
    @ApiPropertyOptional({
        minimum: 1,
        maximum: 50,
        default: 10,
    })
        @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly take?: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}
