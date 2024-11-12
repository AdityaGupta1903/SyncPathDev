import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import prisma from "@shared/db"
import { google } from "googleapis";
import { Readable } from "stream";
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
    if (User) {
      let oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

      let MessageIds = User.MsgAcknowledged;
      let findIdx = -1;
      MessageIds.map((ele) => {
        if (ele == msgId) {
          findIdx = 0;
        }
      })
      if (findIdx == -1) {
        if (User.DriveAccessToken && User.DriveRefreshToken) {
          oauth2Client.setCredentials({ access_token: User.DriveAccessToken, refresh_token: User.DriveRefreshToken });
          const bufferStream = new Readable();
          bufferStream.push(Buffer.from(AttachmentData.AttachmentData, "base64"));
          bufferStream.push(null); // Signals the end of the stream
          let drive = google.drive({
            version: 'v3',
            auth: oauth2Client
          });
          const res = await drive.files.create({
            requestBody: {
              name: filename,
              mimeType: mimeType
            },
            media: {
              mimeType: mimeType,
              body: bufferStream
            }
          })
          if (res.status == 200) {
            MessageIds.push(msgId);
            await prisma.user.update({
              where: {
                email: emailId
              },
              data: {
                MsgAcknowledged: MessageIds
              }
            })
          }
        }
      }
    }
    else {
      res.send({ message: "Attachment has been already send to the drive" })
    }

    fs.writeFileSync('test.pdf', Buffer.from(AttachmentData.AttachmentData, "base64"))

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
