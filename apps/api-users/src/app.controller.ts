import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ZapDTO } from './dto/zap.dto';
import { TriggerDetails } from './dto/TriggerDetails.dto';
import { AvailableTriggerDetails } from './dto/AvailableTriggerDetails';
import { ActionDetails } from './dto/ActionDetails.dto';
import { CreateAvailableAction } from './dto/CreateAvailableAction.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Post('/api/v1/signin')
  // SignIn(@Body(ValidationPipe) user:CreateUserDTO) {
  //   return this.appService.SignIn(user);
  // }
  // @Post('/api/v1/signup')
  // SignUp(@Body(ValidationPipe) user:CreateUserDTO) {
  //   return this.appService.SignUp(user);
  // }
  @Post('/api/v1/CreateZap')
  CreateZap(@Body(ValidationPipe) ZapDetails:ZapDTO) {
    return this.appService.CreateZap(ZapDetails);
  }
  @Post('/api/v1/CreateTrigger')  /// Complete These EndPoints
  CreateTrigger(@Body(ValidationPipe) TriggerDetails:TriggerDetails) {
    return this.appService.CreateTrigger(TriggerDetails);
  }
  @Post('/api/v1/CreateAvailableTrigger')
  CreateAvailableTrigger(@Body(ValidationPipe) AvailableTriggerDetails:AvailableTriggerDetails){
    return this.appService.CreateAvailableTriggers(AvailableTriggerDetails);
  } 
  @Post('/api/v1/CreateAction')
  CreateAction(@Body(ValidationPipe) ActionDetails:ActionDetails){
    return  this.appService.CreateActions(ActionDetails);
  }
  @Post('/api/v1/CreateAvailableAction')
  CreateAvailable(@Body(ValidationPipe) CreateAvailableAction : CreateAvailableAction){
    return this.appService.CreateAvailableAction(CreateAvailableAction)
  }
}
