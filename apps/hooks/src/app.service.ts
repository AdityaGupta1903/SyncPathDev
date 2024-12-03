import { Injectable } from '@nestjs/common';

import prisma from 'Client/db';
@Injectable()
export class AppService {

  RunZap(metadata: any, userId: string, zapId: string) {
    //// Extract some Metadata and push it to Database of ZapRun and ZapRun Outbox
    // console.log(metadata)
    const AddInZapRunDB = async () => {
      await prisma.$transaction(async tx => {  /// Create Transaction to roll Back if any of the query fails 
           const run = tx.zapRun.create({
            data:{
              ZapId : zapId,
              MetaData : metadata
            }
           })
           await tx.zapRunOutBox.create({
            data:{
              ZapRunId:(await run).ZapRunId,
              MetaData : metadata
            }
          })
         
      })
    }
   // AddInZapRunDB();
  }
}
