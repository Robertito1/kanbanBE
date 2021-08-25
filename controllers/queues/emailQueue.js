const Queue = require("bull");
const sendRemainderEmail = require("../utils/sendRemainderEmail");
const { tasksData } = require("./tasksData");

const emailJobsQueue = new Queue("sendEmails", {
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
  }, 
  limiter: {
    max: 1,
    duration: 10000 * 6,  
  },
});

emailJobsQueue.process(async (job, done) => {
  console.log(`[${(new Date()).toISOString()}] Sending remainder email - Job Processing...`);
  await sendRemainderEmail(tasksData[0].email);        
  done();
});

emailJobsQueue.add('cron', {},
  {
  repeat: { 
    cron: process.env.CRON_MAIL_INTERVAL,
    limit: 1,
  },
  attempts: 3,
  jobId: 'cronbJob',
  removeOnComplete: true,
  removeOnFail: true,
});

emailJobsQueue.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});

module.exports = { emailJobsQueue };