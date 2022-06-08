import { IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    comment: string;
    
    @IsString()
    user_id: string;

    @IsString()
    activity_id: string;
}
