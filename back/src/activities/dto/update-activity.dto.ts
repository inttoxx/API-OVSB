import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsString()
    category_id: string

    @IsOptional()
    @IsString()
    date: string

    @IsOptional()
    @IsString()
    time: string

    @IsOptional()
    @IsString()
    duration: string
  
    @IsOptional()
    @IsString()
    user_id: string
}
