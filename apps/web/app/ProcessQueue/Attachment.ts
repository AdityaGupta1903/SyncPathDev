import { Worker, Queue } from 'bullmq';
import Redis from 'ioredis';
const connection = new Redis();

export const AttachmentQueue = new Queue('AttachmentQueue', {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  },
});