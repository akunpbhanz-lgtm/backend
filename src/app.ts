import "dotenv/config";
import cors from "cors";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import router from "./routes";

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins && allowedOrigins.length ? allowedOrigins : undefined,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ name: "EFOZone API", version: "0.1.0" });
});

app.use("/api", router);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
