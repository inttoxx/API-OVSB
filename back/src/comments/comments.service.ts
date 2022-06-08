import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';


@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = new this.commentModel(createCommentDto);
    await comment.save();
    return { comment } ;
  }

  async findAll() {
    const comments = await this.commentModel.find();
    return { comments };
  }

  async findOne(id: string) {
    const comment = await this.commentModel.findById(id);
    if (!comment) {
      throw new NotFoundException(`the category id ${id} was not found`)
    }
    return { comment };
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const { comment } = await this.findOne(id);

    if (updateCommentDto.comment) {
      comment.comment = updateCommentDto.comment
    }

    comment.save()
    return { comment };
  }

  async remove(id: string) {
    const { comment } = await this.findOne(id);
    await comment.remove();
    return {message: `This action removes #${id} comment`};
  }

  async deleteComment(activity_id: string) {
    const comments = await this.commentModel.find({ activity_id: activity_id })
    await comments.forEach(comment => this.remove(comment._id))
  }
}
