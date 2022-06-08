import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './schemas/activity.schema';

@Injectable()
export class ActivitiesService {
  constructor(@InjectModel(Activity.name) private ActivityModel: Model<ActivityDocument>) {}

  async create(createActivityDto: CreateActivityDto) {
    const activity = new this.ActivityModel(createActivityDto);
    await activity.save();
    return { activity }
  }

  async findAll() {
    const activities = await this.ActivityModel.find();
    return { activities }
  }

  async findOne(id: string) {
    const activity = await this.ActivityModel.findById(id)
    return { activity }
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const { activity } = await this.findOne(id);

    if (updateActivityDto.title) {
      activity.title = updateActivityDto.title;
    }
     if (updateActivityDto.description) {
      activity.description = updateActivityDto.description;
    }
    if (updateActivityDto.category_id) {
      activity.category_id = updateActivityDto.category_id;
    }
    if (updateActivityDto.date) {
      activity.date = updateActivityDto.date;
    }
    if (updateActivityDto.time) {
      activity.time = updateActivityDto.time;
    }
    if (updateActivityDto.duration) {
      activity.duration = updateActivityDto.duration;
    }
    if (updateActivityDto.user_id) {
      activity.user_id = updateActivityDto.user_id
    }

    await activity.save();

    return {message: `Activity with id #${id} successfully updated`};
  }

  async remove(id: string) {
    const { activity } = await this.findOne(id);
    await activity.remove();
    return {message : `Activity #${id} successfully deleted`};
  }
}
