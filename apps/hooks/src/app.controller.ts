import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { metadata } from 'reflect-metadata/no-conflict';
import { RunZapDto } from './dto/RunZapDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(":userId/:zapId")
  RunZap(@Body(ValidationPipe) RunZapData:RunZapDto,@Param('userId') userId:string,@Param('zapId') zapId:string) {

    return this.appService.RunZap(RunZapData.metadata,userId,zapId);
  }
}
