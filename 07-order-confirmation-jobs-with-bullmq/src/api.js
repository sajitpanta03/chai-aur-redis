import express from "express";
import { emailQueue } from "./queue.js";

const app = express();

app.use(express.json());

app.post("/welcome-email", (req, res) => {
  const job = emailQueue.add(
    "Send-welcome-email",
    {
      to: req.body.to,
      name: req.body.name || "Leaner",
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
    },
  );
  res.json({
    message: "Job added to the queue",
    jobId: job.id,
  });
});

app.listen(3000, () => {
  console.log("Server is running on 127.0.0.1:3000");
});
