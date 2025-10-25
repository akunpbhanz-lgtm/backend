import "dotenv/config";
import express from "express";
import cors from "cors";
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

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`EFOZone API listening on port ${port}`);
});
