/** Required External Modules */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

/** Required App Modules */
import logger from "./config/logger";
import { mint, view } from './service/mint.controller';

dotenv.config();

/** App Variables */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/** App Configuration */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/mint/", (req, res) => mint(req, res));
app.get("/view", (req, res) => view(req, res));

/** Server Activation */
app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
