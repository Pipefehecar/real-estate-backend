import { Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        ConfigService: ConfigService,
    ) {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: ConfigService.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user = await this.userRepository.findOneBy({ email });

        // dependiendo del contexto podria ser mucha informacion
        if (!user) throw new UnauthorizedException('Invalid token');

        if (!user.isActive) throw new UnauthorizedException('Inactive user');
        this.logger.log(`User ${email} authenticated`);
        return user;
    }
}
