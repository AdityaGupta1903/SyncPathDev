import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { parse } from "cookie";

type ResponseData = {
  message: string;
};


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/gmail/AuthCode/auth";
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  /// We have to set Tokens in this function
  try {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    const gmailCookie = document.cookie?.split("; ")[1]?.split("=")[1]
    if(!gmailCookie){
      res.send({message : "Invalid Cookie Send"});
    }

    oauth2Client.setCredentials({ access_token: gmailCookie });
    let gmail = google.gmail({ version: "v1", auth: oauth2Client });
    
    const message = req.body.message;
    if (!message || !message.data) {
      return res.status(400).send({ message: "Invalid message format" });
    }
    console.log(message)
    const gmailbody = await gmail.users.messages.get({userId:"me",id:message.MessageId});
    console.log(gmailbody);
    const data = Buffer.from(message.data, "base64").toString("utf-8");
    console.log("Notification received:", data);
  } catch (err) {
    console.log(err);
  }
}
