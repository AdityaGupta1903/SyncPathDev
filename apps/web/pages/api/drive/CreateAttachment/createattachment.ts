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
    let User = await prisma.user.findUnique({
      where: {
        email: emailId
      }
    });
     /// Added timeout because Adding Entry to db is taking time to avoid the duplication of Entries we have used or can add BullMQ(Redis Worker to this)
      let addAttachement = async () => {
        if (User) {

          const response = await AttachmentQueue.add('CreateAttachment',{msgId,emailId,mimeType,filename});
          if(response){
            res.send({message : "Attachment Sent to Queue Successfully"});
          }
          else{
            res.send({message : "Some Error has occured"})
          }

          // let oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
          // let MessageIds = User.MsgAcknowledged; /// How many Msg Id have been Processed
          // let findIdx = -1;
          // MessageIds.map((ele) => {
          //   if (ele == msgId) {
          //     findIdx = 0;
          //   }
          // })
          // if (findIdx == -1) {
          //   if (User.DriveAccessToken && User.DriveRefreshToken) {
              
          //     oauth2Client.setCredentials({ access_token: User.DriveAccessToken,refresh_token : User.GmailRefreshToken});
          //     // oauth2Client.setCredentials({})
          //     const bufferStream = new Readable();
          //     bufferStream.push(Buffer.from(AttachmentData.AttachmentData, "base64")); /// To add Large Sized Data
          //     bufferStream.push(null); // Signals the end of the stream
          //     let drive = google.drive({
          //       version: 'v3',
          //       auth: oauth2Client
          //     });
          //     const res = await drive.files.create({
          //       requestBody: {
          //         name: filename,
          //         mimeType: mimeType
          //       },
          //       media: {
          //         mimeType: mimeType,
          //         body: bufferStream
          //       }
          //     })
          //     if (res.status == 200) {
          //       MessageIds.push(msgId);
          //       await prisma.user.update({
          //         where: {
          //           email: emailId
          //         },
          //         data: {
          //           MsgAcknowledged: MessageIds
          //         }
          //       })
          //     }
          //   }
          // }
        }
        else {
          res.send({ message: "Attachment has been already send to the drive" })
        }
      }
      addAttachement();
   

    // clearTimeout(timeout);

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
