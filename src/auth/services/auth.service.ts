import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleError } from '../../common/utils/handle-error';
import { UserCreateDto, UserLoginDto } from '../dtos';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
    private readonly JwtService: JwtService,
  ) {}

  async create(userCreateDto: UserCreateDto) {
    try {
      const { password, ...userData } = userCreateDto;
      const hashedPassword = await this.bcryptService.hash(password);
      const user = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
      delete user.password;
      return { ...user, token: this.getJwtToken({ email: user.email }) };;
    } catch (error) {
      handleError(error);
    }
  }

  async login(userLoginDto: UserLoginDto) {
    const { password, email } = userLoginDto;
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
      select: ['email', 'password'],
    });
    if (!user) throw new NotFoundException('email or password is incorrect');

    const isValidPassword = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isValidPassword)
      throw new NotFoundException('email or password is incorrect');

    return { ...user, token: this.getJwtToken({ email }) };
  }

  private getJwtToken(payload: JwtPayload): string {
    return this.JwtService.sign(payload);
  }
}
