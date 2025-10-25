import { Router } from "express";

import communityRouter from "./community";
import authRouter from "./auth";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/community", communityRouter);
router.use("/auth", authRouter);

export default router;
