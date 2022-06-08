import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  picture_extension: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  description: string

  @IsString()
  gender: string

  @IsString()
  birthdate: string

  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsOptional()
  admin: number;
}
