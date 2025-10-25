import type { Request, Response, NextFunction } from "express";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  if (!ADMIN_TOKEN) {
    console.warn("[admin] ADMIN_TOKEN is not set. All admin requests will be rejected.");
    return res.status(503).json({ message: "Admin access not configured" });
  }

  const headerToken = req.headers["x-admin-token"] ?? req.query.adminToken ?? req.body?.adminToken;

  if (typeof headerToken === "string" && headerToken === ADMIN_TOKEN) {
    return next();
  }

  return res.status(401).json({ message: "Unauthorized" });
}
