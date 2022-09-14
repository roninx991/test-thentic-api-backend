import { createClient } from "redis";
import * as dotenv from "dotenv";

dotenv.config();

const client = createClient({
  url: 'redis://localhost:6379'
});

export default client;