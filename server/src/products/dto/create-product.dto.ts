
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class  CreateProductDto {
 @IsNotEmpty() 
  @IsString()
  name: string;

  @IsNotEmpty() 
  @IsString()
  price: number;

  @IsNotEmpty() 
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
