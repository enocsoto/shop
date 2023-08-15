import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: 'cd55552-f1f2-48cd-aw2s-asda2d33d3ca',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-shirt Teslo Shop',
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product Price',
  })
  @Column('float', {
    default: 0,
  })
  price: number;
  
  @ApiProperty({
    example: 'Anim reprehederit nulla in anim mollit minim irure commodo.',
    description: 'Product Description',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
  
  @ApiProperty({
    example: 'T_shirt_Teslo',
    description: 'Product Slug - for SEO',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  slug: string;
  
  @ApiProperty({
    example: 10,
    description: 'Product Stock',
   default: 0,
  })
  @Column('int', {
    default: 0,
  })
  stock: number;
  
  @ApiProperty({
    example: ['M', 'XL', 'XXL', 'S', 'L'],
    description: 'Product Sizes',
    uniqueItems: true,
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];
  
  @ApiProperty({
    example: 'wommen',
    description: 'Product Gender',
  })
  @Column('text')
  gender: string;
  
  @ApiProperty({
    example: ['Electronics', 'Gadgets'],
    description: 'Product Tagas',
  })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true, // eager permite traer la informacion de entity images
  })
  images?: ProductImage[];
}
