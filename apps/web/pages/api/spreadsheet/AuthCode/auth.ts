import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import prisma from "@shared/db"
import { serialize } from "cookie";

type ResponseData = {
    message: string;
};

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/spreadsheet/AuthCode/auth"; /// Useless in this file

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
            const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client});
            const userInfo = await oauth2.userinfo.get();
            const currentProfileEmailAddress = userInfo.data.email;

            if (currentProfileEmailAddress) {
                if (tokens.refresh_token) {

                    const User = await prisma.user.update({
                        where: {
                            email: currentProfileEmailAddress
                        },
                        data: {
                            SpreadSheetAccessToken: tokens.access_token,
                            SpreadSheetRefreshToken: tokens.refresh_token
                        }
                    })
                    if (User) {

                        await prisma.user.update({
                            where: {
                                email: currentProfileEmailAddress
                            },
                            data: {
                                isSpreadSheetConnected: true
                            }
                        })

                        res.setHeader(
                            "Set-Cookie",
                            serialize("sheets_access_token", tokens.access_token ?? "", {
                                sameSite: "none",
                                path: "/",
                                secure: true,
                                httpOnly: true
                            })
                        ).redirect(`http://localhost:3000/workflows?${currentProfileEmailAddress}`);

                        /// Update that drive is connected

                    }
                    res.send({ message: "token Setted Successfully" });
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}
