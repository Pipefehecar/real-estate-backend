import { Exclude } from "class-transformer";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class AbstractEntity {
    
    @Exclude()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Exclude()
    @CreateDateColumn()
    createdAt: Date;
}