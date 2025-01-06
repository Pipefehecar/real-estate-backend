import { BadRequestException, InternalServerErrorException } from "@nestjs/common";


export function handleError(error: any): never {
    console.log(error);
    const exception_codes = {
      '23502': 'Not null violation',
      '23505': 'Unique violation',
    };
    for (const code in exception_codes) {
      if (error.code === code)
        throw new BadRequestException(exception_codes[code]);
    }
    this.logger.error(error.message, error.stack);
    throw new InternalServerErrorException('Unexpected error occurred');
  }