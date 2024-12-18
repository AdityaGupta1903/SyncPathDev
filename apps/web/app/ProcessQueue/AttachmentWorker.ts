import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { google } from "googleapis"
import prisma from "@shared/db"
import { Readable } from "stream";


const connection = new Redis({ maxRetriesPerRequest: null });  /// Some Error Must be there that's why it is Using maxRetriesPerRequest

const worker = new Worker(
  'EmailAttachmentQueue', // Queue Name
  async (job) => {
    try {
      const data = job?.data;
      let { msgId, emailId, mimeType, filename, Attachmentdata } = job?.data
      let User = await prisma.user.findUnique({
        where: {
          email: emailId
        }
      })
      if (User) {
        
        let oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
        
        let MessageIds = User.MsgAcknowledged; /// How many Msg Id have been Processed
        let findIdx = -1;
        MessageIds.map((ele) => {
          if (ele == msgId) {
            findIdx = 0;
          }
        })
        if (findIdx == -1) {
          if (User.DriveAccessToken && User.DriveRefreshToken) {
            oauth2Client.setCredentials({ access_token: User.DriveAccessToken, refresh_token: User.DriveRefreshToken, expiry_date: Date.now() + 365 * 24 * 60 * 60 * 1000 });

            console.log("Reached")
            // oauth2Client.setCredentials({})
            const bufferStream = new Readable();
            bufferStream.push(Buffer.from(Attachmentdata, "base64")); /// To add Large Sized Data
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
        else {
          console.log(`Attachment Is Already been Processed with messageId ${msgId}`)
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  },
  {
    connection,
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  }
);
// console.log("Reached")

export default worker;