import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import prisma from "@shared/db"
import { google } from "googleapis";
type ResponseData = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const AttachmentData = req.body;
    console.log("Attachment Data recieved", AttachmentData);
    fs.writeFileSync('test.pdf', Buffer.from(AttachmentData.AttachmentData, "base64"))

  } catch (err) {
    console.log(err);
  }
}
