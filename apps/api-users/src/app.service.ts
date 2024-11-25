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

  async CreateZap(ZapDetails: ZapDTO) {
    try {
      const email = ZapDetails.email
      const UserId = prisma.user.findUnique({
        where: {
          email: email
        }
      })
      const ZapName = ZapDetails.ZapName;

      const res = await prisma.zap.create({
        data: {
          ZapName: ZapName,
          UserId: (await UserId).UserId
        }
      })

      return res;

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
  async getAvailableTriggers() {
    try {
      const res = await prisma.availableTrigger.findMany();
      return res;
    }
    catch (err) {
      return new BadRequestException(err);
    }
  }
  async CreateTrigger(TriggerDetails: TriggerDetails) {
    try {
      const ZapId = TriggerDetails.ZapId;
      const AvailableTriggerId = TriggerDetails.AvailableTriggerId;
      console.log(ZapId + " " + AvailableTriggerId)
      ///find the Available TriggerName

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
      return `Action Created with Action Id ${res.AvailableActionId}`
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
  async getUserZaps(email: string) {
    try {
      console.log(email);
      const user = await prisma.user.findFirst({
        where: {
          email: email
        }
      })
      //  console.log(user);
      const res = await prisma.zap.findMany({
        where: {
          UserId: user.UserId
        }
      })
      return res;
    }
    catch (err) {
      return new BadRequestException(err);
    }
  }
  async CreateAttachment(pdfData: string, email: string) {
    try {
      /// Add Google Drive Logic Here
    }
    catch (err) {
      return new BadRequestException(err);
    }
  }
  async SpreadSheetTrait(trait: string, email: string) {
    try {
      let user = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

      if (user) {
        let TraitArray = await prisma.gmailTraits.findMany({
          where: {
            UserId: user.UserId
          }
        });
        let found = false;
        TraitArray.map((ele) => {
          if (ele.Traitname === trait) {
            found = true;
          }
        })
        if (!found) {
          const res = await prisma.gmailTraits.create({
            data: {
              Traitname: trait,
              UserId: user.UserId
            }
          })
          return res.TraitId
        }
        else {
          new BadRequestException(`Trait Already Exists with name ${trait}`);
        }
      }
      else {
        return new BadRequestException("User Not Found");
      }
    }
    catch (err) {
      return new BadRequestException(err);
    }
  }

}
