import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

app.post('/user/:id/json', async(req, res) => {
  await redis.set(`user:${req.params.id}:json`, JSON.stringlify(req.body))

  res.json({
    message: "User data saved as JSON"
  })
})

app.get('user/:id/json', async(req, res) => {
  const raw = await redis.get(`user:${req.params.id}:json`)

  if (!raw) {
    res.json({
      message: "No data found"
    })
  }

  res.json({ user: JSON.parse(raw)})
})

app.post("/user/:id/hash", async (req, res) => {
  await redis.hset
})
