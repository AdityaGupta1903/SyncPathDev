import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import prisma from "@shared/db";
import { SpreadSheetQueue } from "../../../../app/ProcessQueue/Attachment";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { SendersEmail, MessageId, UserEmail, Trait, CLIENT_ID, CLIENT_SECRET } = req.body

        const promise = new Promise((resolve, reject) => {
            try {
                let AddRecordToSpredSheet = async () => {
                    try {

                        const response = await SpreadSheetQueue.add(MessageId, { MessageId, SendersEmail, UserEmail, Trait, CLIENT_ID, CLIENT_SECRET });
                        if (response) {
                            console.log("Details have been pushed to SpreadsheetQueue");
                        }
                        else {
                            console.log("Some Error has occured");
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                AddRecordToSpredSheet().then(() => {
                    resolve({})
                }).catch(() => {
                    reject();
                })
            }
            catch (err) {
                reject();
            }
        })

        promise.then(() => {
            res.send({ "message": "Opertation is Successfull" })
        }).catch(() => {
            res.send({ "message": "Opertation is Failed" })
        })




        // const tempdata = "xyz";
        // let emailId = "guptaditya19@gmail.com";
        // let SpreadSheetId = "1O4HHQgougGnzcG_haYcqoQHqUNl1ee4e6GA5RObmVQQ"
        // let User = await prisma.user.findUnique({
        //     where: {
        //         email: emailId
        //     }
        // })
        // if (User) {
        //     let spreadsheet_access_token = User.SpreadSheetAccessToken;
        //     let spreadsheet_refres_token = User.SpreadSheetRefreshToken;
        //     oauth2Client.setCredentials({ access_token: spreadsheet_access_token, refresh_token: spreadsheet_refres_token });
        //     let spreadsheet = google.sheets({ version: "v4", auth: oauth2Client });
        //     const data = [
        //         [1, 2],
        //         [3, 4],
        //     ];
        //     const spreadSheetvalue = await spreadsheet.spreadsheets.values.get({ spreadsheetId: SpreadSheetId, range: "A:A" });
        //     console.log(spreadSheetvalue.data);
        //     const res = await spreadsheet.spreadsheets.values.update({ spreadsheetId: SpreadSheetId, range: "A3:B4", requestBody: { values: data }, valueInputOption: "USER_ENTERED" });
        //     // console.log(res);
        // }
    }
    catch (err) {

        console.log(err);
        return res.send({ message: "Some error Has occured" });
    }
}