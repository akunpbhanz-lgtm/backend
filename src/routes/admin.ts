import { Router } from "express";
import { count, desc } from "drizzle-orm";

import {
  communityEvents,
  db,
  discussions,
  players,
  tournaments,
  users,
} from "@/db";
import { adminAuth } from "@/middleware/admin-auth";

const adminRouter = Router();

adminRouter.use(adminAuth);

adminRouter.get("/overview", async (_req, res, next) => {
  try {
    const [playerCount] = await db.select({ value: count() }).from(players);
    const [tournamentCount] = await db.select({ value: count() }).from(tournaments);
    const [eventCount] = await db.select({ value: count() }).from(communityEvents);
    const [discussionCount] = await db.select({ value: count() }).from(discussions);
    const [userCount] = await db.select({ value: count() }).from(users);

    const latestTournaments = await db.query.tournaments.findMany({
      orderBy: (table, { desc }) => desc(table.createdAt),
      limit: 5,
    });
    const latestDiscussions = await db.query.discussions.findMany({
      orderBy: (table, { desc }) => desc(table.lastActivity),
      limit: 5,
    });

    res.json({
      metrics: {
        players: Number(playerCount?.value ?? 0),
        tournaments: Number(tournamentCount?.value ?? 0),
        events: Number(eventCount?.value ?? 0),
        discussions: Number(discussionCount?.value ?? 0),
        users: Number(userCount?.value ?? 0),
      },
      latest: {
        tournaments: latestTournaments,
        discussions: latestDiscussions,
      },
    });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/players", async (req, res, next) => {
  try {
    const limit = parseInt(String(req.query.limit ?? "20"), 10) || 20;
    const offset = parseInt(String(req.query.offset ?? "0"), 10) || 0;

    const items = await db.query.players.findMany({
      orderBy: (table, { desc }) => desc(table.createdAt),
      limit,
      offset,
    });

    res.json(items);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/tournaments", async (req, res, next) => {
  try {
    const limit = parseInt(String(req.query.limit ?? "20"), 10) || 20;
    const offset = parseInt(String(req.query.offset ?? "0"), 10) || 0;

    const items = await db.query.tournaments.findMany({
      orderBy: (table, { desc }) => desc(table.createdAt),
      limit,
      offset,
    });

    res.json(items);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/events", async (req, res, next) => {
  try {
    const limit = parseInt(String(req.query.limit ?? "20"), 10) || 20;
    const offset = parseInt(String(req.query.offset ?? "0"), 10) || 0;

    const items = await db.query.communityEvents.findMany({
      orderBy: (table, { desc }) => desc(table.date),
      limit,
      offset,
    });

    res.json(items);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/discussions", async (req, res, next) => {
  try {
    const limit = parseInt(String(req.query.limit ?? "20"), 10) || 20;
    const offset = parseInt(String(req.query.offset ?? "0"), 10) || 0;

    const items = await db.query.discussions.findMany({
      orderBy: (table, { desc }) => desc(table.lastActivity),
      limit,
      offset,
    });

    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default adminRouter;
