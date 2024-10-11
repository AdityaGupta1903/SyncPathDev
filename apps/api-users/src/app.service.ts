import { BadRequestException, ConflictException, Injectable, NotFoundException, Response } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
// import {prisma} from '@shared/db';
import prisma from 'Client/db';
import Jwt from 'jsonwebtoken';
import { ZapDTO } from './dto/zap.dto';
import { TriggerDetails } from './dto/TriggerDetails.dto';
import { AvailableTriggerDetails } from './dto/AvailableTriggerDetails';
import { ActionDetails } from './dto/ActionDetails.dto';
import { CreateAvailableAction } from './dto/CreateAvailableAction.dto';
@Injectable()
export class AppService {
  // async SignIn(user: CreateUserDTO) {
  //   try {
  //     const UserName = user.UserName;
  //     const Password = user.Password;
  //     const User = await prisma.user.findUnique({
  //       where: {
  //         UserName: UserName,
  //         Password: Password
  //       }
  //     })
  //     if (User) {
  //       const secret = "S3CRET";
  //       const token = Jwt.sign({ UserName: UserName, Password: Password }, secret);
  //       return { message: "SignIn Successfull", token: token,statusCode:200 }
  //     }
  //     else {
  //       return new NotFoundException('User Not Found')
  //     }
  //   }
  //   catch (err) {
  //     return new BadRequestException(err);
  //   }
  // }
  // async SignUp(user: CreateUserDTO) {
  //   try {
  //     const UserName = user.UserName;
  //     const Password = user.Password;

  //     const User = await prisma.user.findUnique({
  //       where: {
  //         UserName: UserName,
  //       }
  //     })

  //     if (User) {
  //       return new ConflictException('User Already Exists');
  //     }
  //     else {
  //       const secret = "S3CRET";
  //       const token = Jwt.sign({ UserName: UserName, Password: Password }, secret);
  //       await prisma.user.create({
  //         data: {
  //           UserName: UserName,
  //           Password: Password
  //         }
  //       })
  //       return { message: "SignUp Successfull", token: token,statusCode:200 }
  //     }
  //   }
  //   catch (err) {
  //     return new BadRequestException(err);
  //   }
  // }
  async CreateZap(ZapDetails: ZapDTO) {
    try {
        const email = ZapDetails.email 
        const UserId = prisma.user.findUnique({
          where: {
            email : email
          }
        })
        const ZapName = ZapDetails.ZapName;
        const res = await prisma.zap.create({
          data: {
            ZapName: ZapName,
            UserId: (await UserId).UserId
          }
        })

        return `${(await UserId).UserId}/${res.ZapId}`;
      
    }
    catch (err) {
      return new BadRequestException(err);
    }
  }
  async CreateAvailableTriggers(AvailableTriggerDetails: AvailableTriggerDetails) {
    try {
      const res = await prisma.availableTrigger.create({
        data: {
          TriggerName: AvailableTriggerDetails.TriggerName
        }
      })

      return res;
    }
    catch (err) {
      return new BadRequestException(err);
    }

  }
  async getAvailableTriggers(){
    try{
      const res = await prisma.availableTrigger.findMany();
      return res;
    }
    catch(err){
      return new BadRequestException(err);
    }
  }
  async CreateTrigger(TriggerDetails: TriggerDetails) {
    try {
      const ZapId = TriggerDetails.ZapId;
      const AvailableTriggerId = TriggerDetails.AvailableTriggerId;
      console.log(ZapId + " " + AvailableTriggerId)
      ///find the Available TriggerName
      const TriggerName = await prisma.availableTrigger.findUnique({
        where: {
          AvailabletriggerId: AvailableTriggerId
        }
      })

      const res = await prisma.trigger.create({
        data: {
          ZapId: ZapId,
          AvailabletriggerId: AvailableTriggerId
        }
      })

      return res.TriggerId;
    }
    catch (err) {
      return new BadRequestException(err);
    }
  }
  async CreateAvailableAction(CreateAvailableAction: CreateAvailableAction) {
    try {
      const ActionName = CreateAvailableAction.AvailableActionName;
      const res = await prisma.availabeAction.create({
        data: {
          AvailableActionName: ActionName
        }
      })
      return res.AvailableActionId
    }
    catch (err) {
      return new BadRequestException(err);
    }
  }
  async CreateActions(ActionsDetails: ActionDetails) {
    try {
      const ZapId = ActionsDetails.ZapId
      const AvailableActionId = ActionsDetails.AvailableActionId
      const res = await prisma.action.create({
        data: {
          ZapId: ZapId,
          AvailableActionId: AvailableActionId
        }
      })
      return res.ActionId
    }
    catch (err) {
      return new BadRequestException(err);
    }
  }
}
