import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {

  @IsPositive()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    // console.log(typeof value); // => string / I'm just testing here
    return value;
  })
  @Min(1)
//   @Type(() => Number) // This is necessary to transform the query parameter to a number
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  //   @Type(() => Number) // This is necessary to transform the query parameter to a number
  offset?: number;
}
