import { IsArray, IsEmail, IsString } from 'class-validator';
import { AbstractEntity } from 'src/common/entities';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { UserRoles } from '../enums/user-roles.enum';

@Entity()
export class User extends AbstractEntity{
    @Column('varchar', {length:100, unique: true})
    email: string;

    @Column('varchar')
    fullName: string;

    @Column('varchar', {select: false})
    password: string;

    @Column('enum', {enum: UserRoles, default: UserRoles.USER})
    roles: string[];

    @Column('boolean', {default: true})
    isActive: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    checkEmail(){
        this.email = this.email.toLowerCase().trim();
    }

}
