import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ActivityDocument = Activity & Document;


@Schema()
export class Activity { 
    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    category_id: string

    @Prop()
    date: string

    @Prop()
    time: string

    @Prop()
    duration: string

    @Prop()
    user_id: string
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
