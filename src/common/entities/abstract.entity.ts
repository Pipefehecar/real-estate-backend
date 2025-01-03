import { Exclude } from "class-transformer";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class AbstractEntity {
    
    @PrimaryGeneratedColumn('uuid')
    @Exclude()
    id: string;

    @CreateDateColumn()
    @Exclude()
    createdAt: Date;
}