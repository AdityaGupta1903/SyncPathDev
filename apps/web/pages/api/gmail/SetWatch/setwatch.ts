import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { parse } from "cookie";
import prisma from "@shared/db"

type ResponseData = {
  message: string;
};

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://syncpath.adityagupta.site/api/gmail/AuthCode/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  /// We have to set Watch in this Handler
  try {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    const cookie = parse(req.headers.cookie ?? "");
    const accessToken = cookie?.gmail_access_token;

    if (!accessToken) {
      res.send({ message: "Invalid Access Token Found" });
    }
    oauth2Client.setCredentials({ access_token: accessToken });
    let gmail = google.gmail({ version: "v1", auth: oauth2Client });


    const currentProfileEmailAddress = (await gmail.users.getProfile({ userId: "me" })).data.emailAddress;
    if (currentProfileEmailAddress) {
      const user = await prisma.user.findUnique({
        where: {
          email: currentProfileEmailAddress
        }
      })
      if (user) {
        await prisma.user.update({
          where: {
            email: currentProfileEmailAddress
          },
          data: {
            GmailAccessToken: accessToken
          }
        })
      }
    }
    const response = await gmail.users.watch({
      userId: "me",
      requestBody: {
        topicName: "projects/syncpath-437211/topics/syncpathqueue",
        labelIds: ["INBOX"]
      },
    });


    // console.log(response);
    res.send({ message: "Watch Set SuccessFully" });
  } catch (err) {
    res.send({ message: "Error Setting" });
    console.log(err);
  }
}

