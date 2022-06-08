import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop()
    comment: String;

    @Prop()
    user_id: String;

    @Prop()
    activity_id: String;
 }

 export const CommentSchema = SchemaFactory.createForClass(Comment)