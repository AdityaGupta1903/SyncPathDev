import { Worker, Queue } from 'bullmq';
import Redis from 'ioredis';

// Initialize Redis connection
const connection = new Redis();

// Initialize Queue
export const AttachmentQueue = new Queue('AttachmentQueue', {
  connection, // Pass Redis connection
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  },
});





