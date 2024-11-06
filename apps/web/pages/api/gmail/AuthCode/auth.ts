import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

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

      res.setHeader(
        "Set-Cookie",
        serialize("gmail_access_token", tokens.access_token ?? "", {
          sameSite: "none",
          path: "/",
          secure: true,
        })
      ).redirect("http://localhost:3000/api/gmail/AuthCallback/authcallback");
      //  res.setHeader(
      //   "Set-Cookie",
      //   serialize("gmail-refresh-token", tokens.refresh_token ?? "", {
      //     sameSite: "none",
      //     path: "/",
      //     secure: true,
      //   })
      // );
         
        // res.redirect("http://localhost:3000/api/gmail/AuthCallback/authcallback");
      
      
      res.send({ message: "token Setted Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
}
