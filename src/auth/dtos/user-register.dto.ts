import { IsString, MinLength } from 'class-validator';
import { UserLoginDto } from '../dtos';

export class UserCreateDto extends UserLoginDto {
  @IsString()
  @MinLength(2)
  fullName: string;
}
