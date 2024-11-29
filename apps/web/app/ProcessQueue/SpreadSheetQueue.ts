import Redis from 'ioredis';
import { Worker } from 'bullmq';
import prisma from '@shared/db';
import { google } from 'googleapis';

const connection = new Redis({ maxRetriesPerRequest: null });  /// Some Error Must be there that's why it is Using maxRetriesPerRequest

const worker = new Worker(
  'SpreadSheetSpecialTraitQueue', // Queue Name
  async (job) => {
    try {
      const data = job.data;
      const { MessageId, SendersEmail, UserEmail, Trait, CLIENT_ID, CLIENT_SECRET } = job.data

      console.log("JobData", data);
      const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
      let emailId = UserEmail;
      let SpreadSheetId = "1O4HHQgougGnzcG_haYcqoQHqUNl1ee4e6GA5RObmVQQ"
      let User = await prisma.user.findUnique({
        where: {
          email: emailId
        }
      })
      if (User) {
        let spreadsheet_access_token = User.SpreadSheetAccessToken;
        let spreadsheet_refresh_token = User.SpreadSheetRefreshToken;
        oauth2Client.setCredentials({ access_token: spreadsheet_access_token, refresh_token: spreadsheet_refresh_token });
        let spreadsheet = google.sheets({ version: "v4", auth: oauth2Client });
        const data = [
          [MessageId, SendersEmail, Trait, `https://mail.google.com/mail/u/0/#inbox/${MessageId}`]
        ];
        const spreadSheetvalue = await spreadsheet.spreadsheets.values.get({ spreadsheetId: SpreadSheetId, range: "A:A" });
        console.log(spreadSheetvalue.data.values?.length);
        let CellIndex = (spreadSheetvalue.data.values?.length ?? 0) + 1; /// Get the First Empty Cell and Dump that Data there
        const res = await spreadsheet.spreadsheets.values.update({ spreadsheetId: SpreadSheetId, range: `A${CellIndex}:D${CellIndex}`, requestBody: { values: data }, valueInputOption: "USER_ENTERED" });
        console.log(res);
      }
    }
    catch (err) {
      console.log(err);
    }
    /// Perform the Job Here
  },
  {
    connection,
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  }
);

export default worker;