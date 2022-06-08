import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  await app.useStaticAssets(join(__dirname, '..', 'pictures'), {
    index: false,
    prefix: '/pictures'
  })
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
