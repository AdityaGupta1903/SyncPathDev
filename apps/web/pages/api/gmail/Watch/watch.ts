
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import prisma from "@shared/db"
import axios from 'axios';

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
      const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
      const gmailCookie = User.GmailAccessToken

      if (!gmailCookie) {
        res.send({ message: "Invalid Cookie Send" });
      }

      oauth2Client.setCredentials({ access_token: User.GmailAccessToken, refresh_token: User.GmailRefreshToken }); /// The oAuth Library Automatically refreshes the Access Token using Refresh Token
      let gmail = google.gmail({ version: "v1", auth: oauth2Client });


      // console.log(message)
      const gmailbody = await gmail.users.messages.list({ userId: "me", maxResults: 1 });
      // console.log(gmailbody?.data?.messages[0]?.id);
      // console.log(((await gmail.users.messages.get({userId : "me",id:gmailbody?.data?.messages[0]?.id ?? ""})).data))
      const PartsArray = ((await gmail.users.messages.get({ userId: "me", id: gmailbody?.data?.messages[0]?.id ?? "" })).data).payload?.parts;
      PartsArray && PartsArray.map((part) => {
        if (part.body?.attachmentId) {
          gmail.users.messages.attachments.get({ userId: "me", messageId: gmailbody?.data?.messages[0]?.id ?? "", id: part.body.attachmentId }).then((res) => {

            //  console.log(res.data.data);

            const pdfData = Buffer.from(res.data.data ?? "", "base64");

            axios.post("http://localhost:3000/api/drive/CreateAttachment/createattachment", {
              AttachmentData: res.data.data,
              emailAddress: User.email,
              messageId : gmailbody?.data?.messages[0]?.id
            },
              {
                maxBodyLength: 100000000,
                maxContentLength: 100000000
              })
            console.log(pdfData);
          }).catch(() => console.log("No Attachment found"))
        }
      })
      // console.log(await gmail.users.messages.attachments.get({userId:"me",messageId:gmailbody?.data?.messages[0]?.id ?? ""}))

    }




  } catch (err) {
    console.log(err);
  }
}
