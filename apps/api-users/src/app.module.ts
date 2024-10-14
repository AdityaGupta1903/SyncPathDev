import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { AppController,AppControllerGetFunctions } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/logger.middleware';


@Module({
  imports: [],
  controllers: [AppController,AppControllerGetFunctions],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AppController)
  }
}
// export class AppModule {}
