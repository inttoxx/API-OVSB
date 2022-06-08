import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('picture_extension', {
      storage: diskStorage({
        destination: './pictures',
        filename: (req, file, cb) => {
          const name = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${name}${extname(file.originalname)}`)
        }}),
      }
    ),
  )
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file,
  ) {
    createUserDto.picture_extension = file.filename
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
      return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Request()req,
    @Param('id') id: string) {
    if (req.user.admin === 1 || req.user.id === id) {
      return this.usersService.findOne(id);
    } else {
      throw new UnauthorizedException('You cant do this');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (req.user.admin === 1 || req.user.id === id) {
      return this.usersService.update(id, updateUserDto);
    } else {
      throw new UnauthorizedException('You cant do this');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Request() req,
    @Param('id') id: string) {
    if (req.user.admin === 1 || req.user.id === id) {
      return this.usersService.remove(id);
    } else {
      throw new UnauthorizedException('You cant do this');
    }
  }
}
