import { Body, Controller, Get, Post, Req, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ZapDTO } from './dto/zap.dto';
import { TriggerDetails } from './dto/TriggerDetails.dto';
import { AvailableTriggerDetails } from './dto/AvailableTriggerDetails';
import { ActionDetails } from './dto/ActionDetails.dto';
import { CreateAvailableAction } from './dto/CreateAvailableAction.dto';
import {Request as request} from "express"
import {decode} from 'next-auth/jwt'

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
  CreateZap(@Body(ValidationPipe) ZapDetails:ZapDTO,@Req() request:request) {
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


/// This Controller is only for Public Apis
@Controller()
export class AppControllerGetFunctions{
  constructor (private readonly appService:AppService){}
  @Get('/api/v1/GetAvailableTriggers')
  GetAvailabeTriggers(@Req() request:request){
    console.log(request.cookies["next-auth.session-token"])
     decode({
      token:request.cookies["next-auth.session-token"],
      secret:"S3CRET"
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
   
    return this.appService.getAvailableTriggers();
  }
}
