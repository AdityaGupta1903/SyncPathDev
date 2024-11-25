import { Worker, Queue } from 'bullmq';
import Redis from 'ioredis';

// Initialize Redis connection
const connection = new Redis();
console.log("Reached");
// Initialize Queue
export const AttachmentQueue = new Queue('EmailAttachmentQueue', {
  connection, // Pass Redis connection
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  },
});
// console.log("Executed")





