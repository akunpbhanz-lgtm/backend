import { Router } from "express";
import type { TournamentStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const communityRouter = Router();

communityRouter.get("/players", async (req, res, next) => {
  try {
    const take = parseInt(String(req.query.limit ?? "6"), 10) || 6;
    const players = await prisma.player.findMany({
      orderBy: { createdAt: "desc" },
      take,
    });
    res.json(players);
  } catch (error) {
    next(error);
  }
});

communityRouter.get("/tournaments", async (req, res, next) => {
  try {
    const statusParam = String(req.query.status ?? "UPCOMING,ONGOING");
    const statuses = statusParam.split(",").map((status) => status.trim()).filter(Boolean);
    const tournaments = await prisma.tournament.findMany({
      where: statuses.length
        ? {
            status: {
              in: statuses as TournamentStatus[],
            },
          }
        : undefined,
      orderBy: [{ startDate: "asc" }],
      take: parseInt(String(req.query.limit ?? "4"), 10) || 4,
    });
    res.json(tournaments);
  } catch (error) {
    next(error);
  }
});

communityRouter.get("/events", async (_req, res, next) => {
  try {
    const events = await prisma.communityEvent.findMany({
      orderBy: { date: "asc" },
      take: 6,
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

communityRouter.get("/discussions", async (req, res, next) => {
  try {
    const take = parseInt(String(req.query.limit ?? "4"), 10) || 4;
    const discussions = await prisma.discussion.findMany({
      orderBy: { lastActivity: "desc" },
      take,
    });
    res.json(discussions);
  } catch (error) {
    next(error);
  }
});

export default communityRouter;
