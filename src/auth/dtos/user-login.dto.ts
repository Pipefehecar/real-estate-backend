import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserLoginDto {
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(6)
    @MaxLength(100)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
        'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;
}