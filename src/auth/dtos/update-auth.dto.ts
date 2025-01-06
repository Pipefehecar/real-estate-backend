import { PartialType } from '@nestjs/swagger';
import { UserCreateDto } from './user-register.dto';

export class UpdateAuthDto extends PartialType(UserCreateDto) {}
