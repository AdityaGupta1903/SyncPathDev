import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import prisma from "@shared/db"
import { google } from "googleapis";
import { Readable } from "stream";
import { AttachmentQueue } from "../../../../app/ProcessQueue/Attachment";

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const AttachmentData = req.body;
    console.log("Attachment Data recieved", AttachmentData);
    let msgId = AttachmentData.messageId;
    let emailId = AttachmentData.emailAddress;
    let mimeType = AttachmentData.mimeType;
    let filename = AttachmentData.filename;
    let Attachmentdata = AttachmentData.AttachmentData
    let SendersEmail = AttachmentData.SendersEmail
    let User = await prisma.user.findUnique({
      where: {
        email: emailId
      }
    });
     /// Added timeout because Adding Entry to db is taking time to avoid the duplication of Entries we have used or can add BullMQ(Redis Worker to this)
      let addAttachement = async () => {
        if (User) {

          const response = await AttachmentQueue.add(msgId,{msgId,emailId,mimeType,filename,Attachmentdata,SendersEmail});
          if(response){
            res.send({message : "Attachment Sent to Queue Successfully"});
          }
          else{
            res.send({message : "Some Error has occured"})
          }
        }
        else {
          res.send({ message: "User not Found" })
        }
      }
      addAttachement();
  } catch (err) {
    console.log(err);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}
