import { Body, Controller, Get, Param, Post, Req, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ZapDTO } from './dto/zap.dto';
import { TriggerDetails } from './dto/TriggerDetails.dto';
import { AvailableTriggerDetails } from './dto/AvailableTriggerDetails';
import { ActionDetails } from './dto/ActionDetails.dto';
import { CreateAvailableAction } from './dto/CreateAvailableAction.dto';
import { AttachementDetails } from './dto/AttachementDetails';
import { Request as request } from "express"
import { decode } from 'next-auth/jwt'
import { GmailTrait } from './dto/GmailTrait';
import { UserDetails } from './dto/UserDetails.dto';
import { SpreadSheetTrait } from './dto/SpreadSheetTrait.dto';


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
  CreateZap(@Body(ValidationPipe) ZapDetails: ZapDTO, @Req() request: request) {
    return this.appService.CreateZap(ZapDetails);
  }
  @Post('/api/v1/CreateTrigger')  /// Complete These EndPoints
  CreateTrigger(@Body(ValidationPipe) TriggerDetails: TriggerDetails) {
    return this.appService.CreateTrigger(TriggerDetails);
  }
  @Post('/api/v1/CreateAvailableTrigger')
  CreateAvailableTrigger(@Body(ValidationPipe) AvailableTriggerDetails: AvailableTriggerDetails) {
    return this.appService.CreateAvailableTriggers(AvailableTriggerDetails);
  }


  @Post('/api/v1/CreateAction')
  CreateAction(@Body(ValidationPipe) ActionDetails: ActionDetails) {
    return this.appService.CreateActions(ActionDetails);
  }
  @Post('/api/v1/CreateAvailableAction')
  CreateAvailableAction(@Body(ValidationPipe) CreateAvailableAction: CreateAvailableAction) {
    return this.appService.CreateAvailableAction(CreateAvailableAction)
  }
  @Post('/api/v1/CreateAttachment')
  CreateAttachment(@Body(ValidationPipe) AttachmentDetails: AttachementDetails) {
    return this.appService.CreateAttachment(AttachmentDetails.data, AttachmentDetails.email)
  }
  @Post('/api/v1/CreateSpreadSheetTrait')
  CreateSpreadSheetTrait(@Body(ValidationPipe) SpreadSheetTraitDetails: SpreadSheetTrait) {
    return this.appService.CreateSpreadSheetTrait(SpreadSheetTraitDetails.traitname, SpreadSheetTraitDetails.spreadSheetId, SpreadSheetTraitDetails.spreadsheetName, SpreadSheetTraitDetails.email)
  }

  @Get('/api/v1/getUserDetails')
  getUserDetails(@Req() request: request) {
    const EmailId = request.query.email
    console.log(EmailId);
    if (typeof (EmailId) === "string") {
      return this.appService.getUserDetails(EmailId);
    }
  }


}


/// This Controller is only for Public Apis no need to verify cookies here
@Controller()
export class AppControllerGetFunctions {
  constructor(private readonly appService: AppService) { }
  @Get('/api/v1/GetAvailableTriggers')
  GetAvailabeTriggers(@Req() request: request) {
    // console.log(request.cookies["next-auth.session-token"])
    //  decode({
    //   token:request.cookies["next-auth.session-token"],
    //   secret:"S3CRET"
    // }).then((res)=>{
    //   console.log(res);
    // }).catch((err)=>{
    //   console.log(err);
    // })

    return this.appService.getAvailableTriggers();
  }
  @Get('/api/v1/GetUserZap')  /// not able to send Body that's why we used post mer
  GetUserZap(@Req() request: request) {
    const EmailId = request.query.email
    if (typeof (EmailId) === "string") {
      return this.appService.getUserZaps(EmailId);
    }

  }
}

