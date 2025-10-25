import { Router } from "express";

import communityRouter from "./community";
import authRouter from "./auth";
import adminRouter from "./admin";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/community", communityRouter);
router.use("/auth", authRouter);
router.use("/admin", adminRouter);

export default router;
