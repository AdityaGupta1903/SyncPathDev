
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import prisma from "@shared/db"


type ResponseData = {
  message: string;
};


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/gmail/AuthCode/auth";
let map = new Map<string, string>();
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  /// We have to set Tokens in this function
  try {

    const message = req.body.message;
    if (!message || !message.data) {
      return res.status(400).send({ message: "Invalid message format" });
    }
    const data = Buffer.from(message.data, "base64").toString("utf-8");
    // console.log("Notification received:", JSON.parse(data)?.emailAddress);
    let accessToken = "";
    if (map.has(JSON.parse(data)?.emailAddress)) {
      accessToken = JSON.parse(data)?.emailAddress;
    }
    else {
      let User = await prisma.user.findUnique({
        where: {
          email: JSON.parse(data)?.emailAddress
        }
      })
      if (User) {
        console.log(User)
      }
      accessToken = User?.GmailAccessToken ?? "";
      map.set(JSON.parse(data)?.emailAddress, User?.GmailAccessToken ?? "");
    }
    console.log(accessToken);



    // const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    // const gmailCookie = 

    // if (!gmailCookie) {
    //   res.send({ message: "Invalid Cookie Send" });
    // }

    // oauth2Client.setCredentials({ access_token: gmailCookie });
    // let gmail = google.gmail({ version: "v1", auth: oauth2Client });


    // console.log(message)
    // const gmailbody = await gmail.users.messages.list({ userId: "me" });
    // console.log(gmailbody.data);

  } catch (err) {
    console.log(err);
  }
}
