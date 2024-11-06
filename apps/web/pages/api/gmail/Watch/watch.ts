import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  /// We have to set Tokens in this function
  try {
    const message = req.body.message;
    if (!message || !message.data) {
      return res.status(400).send({ message: "Invalid message format" });
    }
    console.log(message)
    const data = Buffer.from(message.data, "base64").toString("utf-8");
    console.log("Notification received:", data);
  } catch (err) {
    console.log(err);
  }
}
