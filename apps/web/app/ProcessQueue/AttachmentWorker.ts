import { Worker, Queue } from 'bullmq';
import Redis from 'ioredis';


const connection = new Redis();

const worker = new Worker(
    'AttachmentQueue', // this is the queue name, the first string parameter we provided for Queue()
     async (job) => {
      const data = job?.data;
      console.log(data);
      console.log('Task executed successfully');
    },
    {
      connection,
      concurrency: 5,
      removeOnComplete: { count: 1000 },
      removeOnFail: { count: 5000 },
    }
  );

  export default worker;