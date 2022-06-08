import { IsString } from "class-validator";

export class CreateActivityDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    category_id: string

    @IsString()
    date: string

    @IsString()
    time: string

    @IsString()
    duration: string

    @IsString()
    user_id: string
}
