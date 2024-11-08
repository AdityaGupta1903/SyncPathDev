import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import prisma from "@shared/db"
import { serialize } from "cookie";
type ResponseData = {
  message: string;
};

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/gmail/AuthCode/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  /// We have to set Tokens in this function
  try {
    const { code } = req.query;
    if (!code) {
      res.send({ message: "Auth code not received" });
    }
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    if (typeof code === "string") {
      const { tokens } = await oauth2Client.getToken(code);

      oauth2Client.setCredentials(tokens);
      let gmail = google.gmail({ version: "v1", auth: oauth2Client });
      const currentProfileEmailAddress = (await gmail.users.getProfile({ userId: "me" })).data.emailAddress;
      if (tokens.refresh_token) {
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
                GmailRefreshToken: tokens.refresh_token
              }
            })
          }
        }
      }
      console.log("RefeshToken received" + " " + tokens.refresh_token);   /// Refresh Token is only Generated at First Time Login not the Subsequent One

      res.setHeader(
        "Set-Cookie",
        serialize("gmail_access_token", tokens.access_token ?? "", {
          sameSite: "none",
          path: "/",
          secure: true,
          httpOnly: true
        })
      ).redirect("http://localhost:3000/api/gmail/SetWatch/setwatch");

      res.send({ message: "token Setted Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
}
