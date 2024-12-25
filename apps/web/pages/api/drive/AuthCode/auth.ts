import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import prisma from "@shared/db"
import { serialize } from "cookie";
type ResponseData = {
    message: string;
};

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://syncpath.adityagupta.site/api/drive/AuthCode/auth";

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

            let drive = google.drive({ version: "v2", auth: oauth2Client });
            const currentProfileEmailAddress = ((await drive.about.get()).data.user?.emailAddress)
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
                                DriveRefreshToken: tokens.refresh_token,
                                DriveAccessToken: tokens.access_token
                            }
                        })
                    }
                }
            }
            console.log("RefeshToken received for drive" + " " + tokens.refresh_token);   /// Refresh Token is only Generated at First Time Login not the Subsequent One

            res.setHeader(
                "Set-Cookie",
                serialize("drive_access_token", tokens.access_token ?? "", {
                    sameSite: "none",
                    path: "/",
                    secure: true,
                    httpOnly: true
                })
            ).redirect(`https://syncpath.adityagupta.site/Templates/attachment`);

            /// Update that drive is connected
            if (currentProfileEmailAddress) {
                await prisma.user.update({
                    where: {
                        email: currentProfileEmailAddress
                    },
                    data: {
                        isDriveConnected: true
                    }
                })
            }


            res.send({ message: "token Setted Successfully" });
        }
    } catch (err) {
        console.log(err);
    }
}
