import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import mongoose from 'mongoose';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  picture_extension: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  gender: string

  @IsOptional()
  @IsString()
  birthdate: string

  @IsOptional()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;


  @IsOptional()
  admin: number;
}
