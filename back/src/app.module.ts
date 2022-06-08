import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@gonnamove.jclp7.mongodb.net/?retryWrites=true&w=majority`),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'pictures'), }),
    UsersModule,
    ActivitiesModule,
    CategoriesModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
