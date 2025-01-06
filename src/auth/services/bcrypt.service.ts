import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
  async hash(data: string | Buffer): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    return hash(data, salt);
  }

  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
