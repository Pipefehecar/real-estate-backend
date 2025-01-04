import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/entities';
import { Property } from '../entities';

@Entity()
export class PropertyImage extends AbstractEntity {

    @Column('varchar', { length: 255 })
    url: string;

    @ManyToOne(() => Property, (property) => property.images,{ onDelete: 'CASCADE' }) 
    property: Property;
}
