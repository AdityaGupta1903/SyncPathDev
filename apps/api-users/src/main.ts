import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://syncpath.adityagupta.site/',
    credentials: true,
  })
  app.use(cookieParser());

  await app.listen(3002, () => {
    // console.log("Backend Connected")
  });
}
bootstrap();
