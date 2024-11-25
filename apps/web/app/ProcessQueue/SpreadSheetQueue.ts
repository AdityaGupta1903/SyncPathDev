import Redis from 'ioredis';
import { Worker } from 'bullmq';


const connection = new Redis({ maxRetriesPerRequest: null });  /// Some Error Must be there that's why it is Using maxRetriesPerRequest


const worker = new Worker(
    'SpreadSheetSpecialTraitQueue', // Queue Name
    async (job) => {
       /// Perform the Job Here
       const data = job.data;
       console.log("Job Data");
    },
    {
      connection,
      concurrency: 5,
      removeOnComplete: { count: 1000 },
      removeOnFail: { count: 5000 },
    }
  );
  
  export default worker;