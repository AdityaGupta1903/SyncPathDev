import { NextApiResponse, NextApiRequest } from "next";
import prisma from "@shared/db"
import { google } from "googleapis"



const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/spreadsheet/AuthCode/auth"; /// Useless in this file
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        let emailId = req.body.emailId;
        console.log(emailId);
        const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
        let User = await prisma.user.findUnique({
            where: {
                email: emailId
            }
        });
        if (User && User.isSpreadSheetConnected) {
            let spreadsheet_access_token = User.SpreadSheetAccessToken;
            let spreadsheet_refresh_token = User.SpreadSheetRefreshToken;
            oauth2Client.setCredentials({ access_token: spreadsheet_access_token, refresh_token: spreadsheet_refresh_token });
            let drive = google.drive({ version: "v2", auth: oauth2Client });
            let spread_sheet_files = await drive.files.list({
                q: "mimeType='application/vnd.google-apps.spreadsheet'"
            });
            console.log(spread_sheet_files.data.items);
            res.send({ spread_sheet_data: spread_sheet_files.data.items });
        }
        else {
            res.send({ spread_sheet_data: [] });
        }
    }
    catch (err) {
        res.send({ spread_sheet_data: [] });
        console.log(err);
    }

}