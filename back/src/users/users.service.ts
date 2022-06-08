import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    const userFoundByEmail = await this.findOneByEmail(createUserDto.email);

    if (userFoundByEmail) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const user = new this.userModel(createUserDto);
    user.salt = salt;

    await user.save();

    return { user };
  }

  async findAll() {
    const users = await this.userModel.find();
    return { users };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`The user with id ${id} was not found`);
    }

    return { user };
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).lean();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { user } = await this.findOne(id);

    if (updateUserDto.picture_extension) {
      user.picture_extension = updateUserDto.picture_extension;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(updateUserDto.password, salt);
      user.salt = salt;
    }
    if (updateUserDto.firstname) {
      user.firstname = updateUserDto.firstname;
    }
    if (updateUserDto.lastname) {
      user.lastname = updateUserDto.lastname;
    }
    if (updateUserDto.admin) {
      user.admin = updateUserDto.admin;
    }
    if (updateUserDto.description) {
      user.description = updateUserDto.description;
    }
    if (updateUserDto.gender) {
      user.gender = updateUserDto.gender;
    }
    if (updateUserDto.birthdate) {
      user.birthdate = updateUserDto.birthdate;
    }
     await user.save();
    return { user };
  }

  async remove(id: string) {
    const { user } = await this.findOne(id);
    await user.remove();
    return { message: `user #${id} successfully deleted` };
  }
}
