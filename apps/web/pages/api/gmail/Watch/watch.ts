
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import prisma from "@shared/db";
import axios from 'axios';
import { AsyncResource } from "async_hooks";
type ResponseData = {
  message: string;
};

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/gmail/AuthCode/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  /// We have to set Tokens in this function
  try {

    const message = req.body.message;
    if (!message || !message.data) {
      return res.status(400).send({ message: "Invalid message format" });
    }

    const data = Buffer.from(message.data, "base64").toString("utf-8");

    let User = await prisma.user.findUnique({
      where: {
        email: JSON.parse(data)?.emailAddress
      }
    })
    // console.log(User)
    if (User) {

      const promise = new Promise(async (resolve, reject) => { //// Created Promise to 
        try {
          const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
          const gmailCookie = User.GmailAccessToken

          if (!gmailCookie) {
            return res.send({ message: "Invalid Cookie Send" });
          }

          oauth2Client.setCredentials({ access_token: User.GmailAccessToken, refresh_token: User.GmailRefreshToken }); /// The oAuth Library Automatically refreshes the Access Token using Refresh Token
          let gmail = google.gmail({ version: "v1", auth: oauth2Client });

          const gmailbody = await gmail.users.messages.list({ userId: "me", maxResults: 1 }); /// To fetch the Top Result from the Gmail
          let msgId = gmailbody?.data?.messages ? gmailbody?.data?.messages[0]?.id ?? "" : ""
          const PartsArray = ((await gmail.users.messages.get({ userId: "me", id: msgId })).data).payload?.parts;
          let Headers = ((await gmail.users.messages.get({ userId: "me", id: msgId })).data).payload?.headers;
          // console.log((PartsArray[1]?.body?.data.replace(/-/g, '+').replace(/_/g, '/')));

          let SendersEmail: string | undefined = "";
          Headers?.map((ele) => {
            if (ele.name === "From") {
              SendersEmail = ele.value?.split(" ")[ele.value?.split(" ").length - 1]?.split("<")[1]?.split(">")[0]
            }
          })
          console.log(SendersEmail);
          /// This is for Attachement Purposes 
          PartsArray && PartsArray.map((part) => {
            if (part.body?.attachmentId) {
              gmail.users.messages.attachments.get({ userId: "me", messageId: msgId, id: part.body.attachmentId }).then((res) => {

                axios.post("http://localhost:3000/api/drive/CreateAttachment/createattachment", {
                  AttachmentData: res.data.data,
                  emailAddress: User.email,
                  SendersEmail: SendersEmail,
                  messageId: gmailbody?.data?.messages ? gmailbody?.data?.messages[0]?.id : "",
                  filename: part.filename,
                  mimeType: part.mimeType
                },
                  {
                    maxBodyLength: 100000000,
                    maxContentLength: 100000000
                  })

              }).catch(() => console.log("No Attachment found"))
            }
          })

          //// For Some Trait Related Email and then Post it To SpreadSheet

          const gmailTraitArray = await prisma.gmailTraits.findMany({
            where: {
              UserId: User.UserId
            }
          })
          PartsArray?.map((part, index) => {
            if (index == 1) {   /// Index1 Used Because we the Index0 Returns the H
              let Data = Buffer.from(part.body?.data ?? "", "base64").toString("utf-8");
              gmailTraitArray.map((trait) => {
                let traitName = trait.Traitname;
                if (Data.toLowerCase().search(traitName.toLowerCase()) !== -1) {
                  axios.post("http://localhost:3000/api/spreadsheet/WriteData/write", {
                    SendersEmail: SendersEmail,
                    MessageId: msgId,
                    UserEmail: User.email,
                    Trait: traitName,
                    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
                    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
                  })
                }
              })
            }
          })
          resolve({});
        }
        catch (err) {
          reject();
        }
      })

      promise.then(() => {
        console.log("Reached Correct Value")
        res.send({ message: "SuccessFully Performed the Operation" })
      }).catch((err) => {
        console.log("Reached Wrong Value")
        res.send({ message: "Some Error Has Occured" });
      })

    }
    return res.send({ message: "value Received" });

  } catch (err) {
    return res.send({ message: "Some Error Has Occured" });
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}
