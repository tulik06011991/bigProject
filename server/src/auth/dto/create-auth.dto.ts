import { IsString, MinLength, IsEmail,  IsOptional, IsDateString } from "class-validator";

export class CreateAuthDto {
@IsString()
name: string;
@IsEmail()
email: string;
@IsString()
@MinLength(6)
password: string;

@IsOptional()
@IsDateString() // Ixtiyoriy, lekin foydalanuvchi yubormasligi kerak
createdAt?: string;


}
