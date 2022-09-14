import { createClient } from "redis";
import * as dotenv from "dotenv";

dotenv.config();

const client = createClient({
  socket: {
    host: process.env.REDIS_HOSTNAME,
    port: parseInt(process.env.REDIS_PORT ? process.env.REDIS_PORT : "6379")
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD
});

export default client;