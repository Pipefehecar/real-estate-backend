import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/entities';
import { PropertyStatus, PropertyType } from '../enums';
import { PropertyImage } from './property-image.entity';

@Entity()
export class Property extends AbstractEntity {
  @Column('varchar', { length: 100, unique: true })
  title: string;

  @Column('text')
  description: string;

  @Column('enum', { enum: PropertyType })
  type: PropertyType;

  @Column('float', { nullable: true })
  price: number;

  @Column('float', { nullable: true })
  latitude: string;

  @Column('float', { nullable: true })
  longitude: string;

  @Column('int', { nullable: true })
  bedrooms: number;

  @Column('int', { nullable: true })
  bathrooms: number;

  @Column('int', { nullable: true })
  area: number;

  @Column('boolean', { default: false })
  garage: boolean;
  @Column('enum', { enum: PropertyStatus, default: PropertyStatus.ACTIVE })
  status: PropertyStatus;
  @OneToMany(() => PropertyImage, (image) => image.property, {
    cascade: true,
    eager: true,
  })
  images?: PropertyImage[];

  tags: string[];

  @Column('varchar', { length: 100, unique: true })
  slug: string;

  @BeforeInsert()
  beforeInsert() {
    if (!this.slug) this.slug = this.title;
    this.fixSlug(this.slug);
  }

  @BeforeUpdate()
  beforeUpdate() {
    if (!this.slug) this.slug = this.title;
    this.fixSlug(this.slug);
  }

  private fixSlug(slug: string) {
    this.slug = slug.toLowerCase().toLowerCase().trim().replace(/ /g, '-');
  }
}
