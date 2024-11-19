import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
type ResponseData = {
    message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            "http://localhost:3000/api/spreadsheet/AuthCode/auth"  /// useless in this file 
        );

        const scopes = [
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/userinfo.email",  /// For getting the UserData Such as Email or other Things
            "https://www.googleapis.com/auth/userinfo.profile" 
        ];
        const url = oauth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: "offline",
            // If you only need one scope, you can pass it as a string
            scope: scopes,

        });
        console.log(url);
        res.redirect(url);
    } catch (err) {
        console.log(err);
    }
}
