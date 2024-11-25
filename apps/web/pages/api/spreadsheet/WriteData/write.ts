import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import prisma from "@shared/db";
import { SpreadSheetQueue } from "../../../../app/ProcessQueue/Attachment";


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/spreadsheet/AuthCode/auth"; /// Useless in this file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
        const { SendersEmail, MessageId, UserEmail } = req.body

        let AddRecordToSpredSheet = async () => {
            try {

                const res = await SpreadSheetQueue.add(MessageId, { MessageId, SendersEmail, UserEmail });
                if (res) {
                    console.log("Details have been pushed to SpreadsheetQueue");
                }
                else {
                    console.log("Some Error has occured");
                }

            }
            catch (err) {
                res.send(err);
            }
        }

        AddRecordToSpredSheet();


        const tempdata = "xyz";
        let emailId = "guptaditya19@gmail.com";
        let SpreadSheetId = "1O4HHQgougGnzcG_haYcqoQHqUNl1ee4e6GA5RObmVQQ"
        let User = await prisma.user.findUnique({
            where: {
                email: emailId
            }
        })
        if (User) {
            let spreadsheet_access_token = User.SpreadSheetAccessToken;
            let spreadsheet_refres_token = User.SpreadSheetRefreshToken;
            oauth2Client.setCredentials({ access_token: spreadsheet_access_token, refresh_token: spreadsheet_refres_token });
            let spreadsheet = google.sheets({ version: "v4", auth: oauth2Client });
            const data = [
                [1, 2],
                [3, 4],
            ];
            const spreadSheetvalue = await spreadsheet.spreadsheets.values.get({ spreadsheetId: SpreadSheetId, range: "A:A" });
            console.log(spreadSheetvalue.data);
            const res = await spreadsheet.spreadsheets.values.update({ spreadsheetId: SpreadSheetId, range: "A3:B4", requestBody: { values: data }, valueInputOption: "USER_ENTERED" });
            // console.log(res);
        }
    }
    catch (err) {
        console.log(err);
    }
}