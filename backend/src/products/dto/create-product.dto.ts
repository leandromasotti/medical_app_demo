import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'General Surgery' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Short description of the product', example: 'Comprehensive surgical procedures' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Detailed description of the product', example: 'General surgery encompasses a wide range of surgical procedures...' })
  @IsString()
  @IsNotEmpty()
  longDescription: string;

  @ApiProperty({ description: 'Price of the product in USD', example: 5000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'URL to the product image', example: '/images/surgery.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: 'Category of the product', example: 'Surgery' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Provider of the medical service', example: 'Central Medical Center' })
  @IsString()
  @IsNotEmpty()
  provider: string;

  @ApiProperty({ description: 'Location where the service is provided', example: 'San José, Costa Rica' })
  @IsString()
  @IsNotEmpty()
  location: string;
}
