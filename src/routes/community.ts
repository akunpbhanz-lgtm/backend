import { Router } from "express";

import { db, TournamentStatus, tournamentStatusEnum } from "@/db";

const communityRouter = Router();

communityRouter.get("/players", async (req, res, next) => {
  try {
    const take = parseInt(String(req.query.limit ?? "6"), 10) || 6;
    const result = await db.query.players.findMany({
      orderBy: (table, { desc }) => desc(table.createdAt),
      limit: take,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

communityRouter.get("/tournaments", async (req, res, next) => {
  try {
    const statusParam = String(req.query.status ?? "UPCOMING,ONGOING");
    const statuses = statusParam
      .split(",")
      .map((status) => status.trim().toUpperCase())
      .filter((status): status is TournamentStatus =>
        tournamentStatusEnum.enumValues.includes(status as TournamentStatus)
      );

    const result = await db.query.tournaments.findMany({
      where: statuses.length
        ? (table, { inArray }) => inArray(table.status, statuses)
        : undefined,
      orderBy: (table, { asc }) => asc(table.startDate),
      limit: parseInt(String(req.query.limit ?? "4"), 10) || 4,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

communityRouter.get("/events", async (_req, res, next) => {
  try {
    const result = await db.query.communityEvents.findMany({
      orderBy: (table, { asc }) => asc(table.date),
      limit: 6,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

communityRouter.get("/discussions", async (req, res, next) => {
  try {
    const take = parseInt(String(req.query.limit ?? "4"), 10) || 4;
    const result = await db.query.discussions.findMany({
      orderBy: (table, { desc }) => desc(table.lastActivity),
      limit: take,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default communityRouter;
