
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import prisma from "@shared/db";
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

      const gmailbody = await gmail.users.messages.list({ userId: "me", maxResults: 1 });
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
        where : {
          UserId : User.UserId
        }
      })
      PartsArray?.map((part,index)=>{
        if(index == 1){   /// Index1 Used Because we the Index0 Returns the H
          let Data = Buffer.from(part.body?.data ?? "","base64").toString("utf-8");
          gmailTraitArray.map((trait)=>{
            let traitName = trait.Traitname;
            if(Data.toLowerCase().search(traitName)){
              //// Send a Api Call to Create the Entry in the Excel File /// Save Sends Name, Date, Time and Data
               
            }
          })
        }
      })

    }

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
