import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { Activity, ActivitySchema } from './schemas/activity.schema';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }]),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService]
})
export class ActivitiesModule {}
